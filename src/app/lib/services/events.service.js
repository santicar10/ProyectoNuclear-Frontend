const eventsService = {
  async getAll() {
    return { success: true, data: [] };
  },

  async getById(id) {
    return { success: true, data: {} };
  },

  async create(data) {
    return { success: true, message: "Evento creado correctamente" };
  },

  async update(id, data) {
    return { success: true, message: "Evento actualizado correctamente" };
  },

  async remove(id) {
    return { success: true, message: "Evento eliminado correctamente" };
  },
};

export default eventsService;
