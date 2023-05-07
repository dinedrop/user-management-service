import { KafkaConsumer } from "@dinedrop/shared";

const brokers = ["my-cluster-kafka-bootstrap.kafka:9092"];
const groupId = "my-consumer-group";
const topics = ["user-created"];

async function consumeKafkaMessages() {
  const consumer = new KafkaConsumer(brokers, groupId);

  async function handleUserCreated(payload: any) {
    console.log("payload", payload);
  }

  consumer.on("user-created", handleUserCreated);

  await consumer.connect();
  await consumer.subscribe(topics);
  await consumer.run();
}

export default consumeKafkaMessages;
