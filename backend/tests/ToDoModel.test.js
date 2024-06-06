const ToDoModel = require('../src/models/ToDoModel');

// descreve o modelo de ToDo
describe('ToDoModel', () => {
  // descreve o esquema
  describe('schema', () => {
    // teste para verificar se há o campo texto
    test('deve ter o campo texto', () => {
      const todo = new ToDoModel();
      const text = todo.text; // pega o campo texto
      expect(text).toBeDefined(); // verifica se o campo texto está definido
    });

    // teste para verificar se o campo texto é obrigatório
    test('deve exigir o campo texto', () => {
      const todo = new ToDoModel();
      const validationResult = todo.validateSync(); // valida o modelo ToDo
      const { message } = validationResult.errors.text; // obtém a mensagem de erro
      expect(message).toBe('Path `text` is required.'); // verifica se a mensagem de erro é correta
    });
  });
});
