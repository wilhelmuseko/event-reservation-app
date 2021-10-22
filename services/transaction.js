const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const transactionService = {};

const getTicketPurchaseQuery = () => {
  return {
    attributes: ['id', 'date_of_purchase'],
    include: [
      {
        model: repository.customer,
        attributes: [
          'first_name',
          'last_name',
          'date_of_birth',
          'phone_number',
          'street_address',
          'city',
          'state',
          'unit_no',
          'postal_code',
        ],
      },
      {
        model: repository.ticketPurchaseDetail,
        attributes: ['id', 'quantity'],
        include: [
          {
            model: repository.eventTicket,
            attributes: ['id', 'type', 'quota', 'price'],
            include: [
              {
                model: repository.event,
                attributes: ['name', 'description', 'start_date', 'end_date'],
                include: [repository.location],
              },
            ],
          },
        ],
      },
    ],
  };
};

transactionService.getAll = async () => {
  try {
    const query = getTicketPurchaseQuery();
    query['order'] = [['date_of_purchase', 'DESC']];
    const data = await repository.ticketPurchase.findAll(query);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

transactionService.save = async (body) => {
  try {
    const customerData = body.customer;
    let customer = await repository.customer.findOne({
      where: {
        phone_number: customerData.phone_number,
      },
    });

    if (!customer) {
      customer = await repository.customer.create(customerData);
    }

    const purchaseData = {
      customer_id: customer.id,
    };
    const newPurchase = await repository.ticketPurchase.create(purchaseData);
    const eventTickets = body.event.tickets;

    for (var ticket of eventTickets) {
      const purchaseDetailData = {
        ticket_purchase_id: newPurchase.id,
        event_ticket_id: ticket.id,
        quantity: ticket.quantity,
      };
      await repository.ticketPurchaseDetail.create(purchaseDetailData);
    }
    const query = getTicketPurchaseQuery();
    query['where'] = {
      id: newPurchase.id,
    };
    const data = await repository.ticketPurchase.findAll(query);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

transactionService.getTotalQuantityPurchaseByEventTicketId = async (id) => {
  try {
    const data = await repository.ticketPurchaseDetail.sum('quantity', {
      where: {
        event_ticket_id: id,
      },
    });
    return data || 0;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = transactionService;
