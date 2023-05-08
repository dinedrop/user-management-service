import { KafkaConsumer, ConsumerConfig } from "@dinedrop/shared";
import { userService } from "../user";

const consumerConfig: ConsumerConfig = {
  brokers: ["my-cluster-kafka-bootstrap.kafka:9092"],
  groupId: "100",
};

const consumer = new KafkaConsumer(consumerConfig);

consumer.on("user-registered", async (result) => {
  const value = result.value?.toString();
  if (value === undefined || value == "{}") return;
  try {
    const user = JSON.parse(value);
    const newUser = await userService.createUser(user);
    console.log("new user created: ", newUser);
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe(["user-registered"]);
  await consumer.run();
}

export default runConsumer;
