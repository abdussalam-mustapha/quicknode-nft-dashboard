export function broadcastToSubscribers(subscribers, topic, data) {
  if (subscribers.has(topic)) {
    const message = JSON.stringify({
      type: 'UPDATE',
      topic,
      data
    });

    subscribers.get(topic).forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(message);
      }
    });
  }
}