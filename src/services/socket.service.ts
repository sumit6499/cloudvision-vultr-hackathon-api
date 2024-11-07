import { Socket } from 'socket.io';


const initSocketService = () => {
  io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} connected`);

    socket.on('msg', async (msg) => {
      console.log('message incoming');

      try {


        const systemPrompt = `You are a chatbot that helps users find home improvement services based on their input. 
        You have access to a table of services in CSV format. Based on the user’s category selection, 
        dynamically find relevant questions to ask and options to provide. 
        Your goal is to guide the user through the questions to identify a service code, 
        then collect personal information such as name, email, zip code, and phone number.`;

        const res = await promptTemplate.invoke({
          system_prompt: `${systemPrompt} Based on the input, ask the next question from the document, and extract options that are after '>' symbol.`,
          chat_history: msg,
          context: documentData,
        });

        socket.emit('receive-msg', {
          role: 'bot',
          content: res,
        });
      } catch (error) {
        console.log('Error in processing message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  });
};

export default initSocketService;