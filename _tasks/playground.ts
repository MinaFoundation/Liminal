import CID from "cids"
import { createLibp2p } from "libp2p"
import Gossipsub from "libp2p-gossipsub"
import Mplex from "libp2p-mplex"
import { NOISE } from "libp2p-noise"
import TCP from "libp2p-tcp"

// Create a libp2p node
const createNode = async () => {
  const node = await createLibp2p({
    addresses: {
      listen: ["/ip4/0.0.0.0/tcp/0"],
    },
    transports: [TCP],
    streamMuxers: [Mplex],
    connectionEncryption: [NOISE],
    modules: {
      pubsub: Gossipsub,
    },
    config: {
      pubsub: {
        enabled: true,
        emitSelf: true,
        signMessages: true,
      },
    },
  })

  return node
}

// Bootstrap to Mina node
const bootstrap = async (node, bootnodes) => {
  for (const addr of bootnodes) {
    try {
      await node.dial(addr)
      console.log(`Connected to ${addr}`)
    } catch (err) {
      console.error(`Failed to connect to ${addr}: ${err}`)
    }
  }
}

// Subscribe to GossipSub topic
const subscribeToTopic = (node, topic) => {
  node.pubsub.subscribe(topic, (msg) => {
    console.log(`Received message on topic ${topic}: ${msg.data.toString()}`)
  })
}

// Main function
const main = async () => {
  const bootnodes = [
    "/ip4/your.mina.node.ip/tcp/4002/p2p/your.mina.node.peer.id",
    // Add more bootnodes if available
  ]

  const node = await createNode()
  await bootstrap(node, bootnodes)

  const gossipSubTopics = [
    "mina-blocks", // Example topic, replace with actual topic(s)
    // Add more topics if needed
  ]

  // Subscribe to each topic
  gossipSubTopics.forEach((topic) => subscribeToTopic(node, topic))

  console.log("Listening for GossipSub messages...")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
