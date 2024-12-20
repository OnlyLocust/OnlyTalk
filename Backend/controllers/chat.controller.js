import chat from "../models/chat.js";
import user from "../models/user.js";

const enterMessage = async (req, res) => {
  const sender = req.params.sender;
  const reciever = req.params.reciever;
  const msg = req.body.message;

  const u = await user.find({ username: reciever });

  if (u.length == 0) {
    return res.status(400).json({ message: "Reciever not exists" });
  }

  const ischat = await chat.find({ sender: sender, reciever: reciever });

  if (ischat.length != 1) {
    try {
      const chats = new chat({ sender, reciever, messages: [] });
      const chatr = new chat({
        sender: reciever,
        reciever: sender,
        messages: [],
      });
      await chats.save();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  try {
    const talk = await chat.findOne({ sender, reciever });
    const msgs = talk.messages;
    let addmsg;
    if (msgs.length >= 40) {
      const startIndex = Math.floor(msgs.length / 2);
      const secondHalf = msgs.slice(startIndex);
      addmsg = [...secondHalf, msg];
    } else addmsg = [...msgs, msg];

    const added = await chat.updateOne(
      { sender: sender, reciever: reciever },
      { messages: addmsg }
    );

    return res.status(200).json({ msg });
  } catch (error) {

    return res.status(400).json(error);
  }
};

const getChat = async (req, res) => {
  const sender = req.params.sender;
  const reciever = req.params.reciever;

  try {
    const chats1 = await chat.find({ sender: sender, reciever: reciever });
    const chats2 = await chat.find({ sender: reciever, reciever: sender });
    if(chats1.length == 0 && chats2.length == 0){
      const chats = new chat({ sender, reciever, messages: [] });
      const chatr = new chat({
        sender: reciever,
        reciever: sender,
        messages: [],
      });
      await chats.save()
      await chatr.save()
      return res
      .status(200)
      .json({ msgs1: [], msgs2: [] });

      
    }
    return res
      .status(200)
      .json({ msgs1: chats1[0].messages, msgs2: chats2[0].messages });
  } catch (error) {

    return res.status(400).json(error);
  }
};

export { enterMessage, getChat };
