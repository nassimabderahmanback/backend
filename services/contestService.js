const { Error } = require("mongoose");
const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const randomBytes = require("randombytes");
const mongoose = require("mongoose");

exports.createContest = async (
  name,
  startDate,
  endDate,
  ticketNumbers,
  chooseprices,
  mainPrice,
  status
) => {
  try {
    // check contest name previously use or not
    const oldContests = await Contest.find({ name });
    if (oldContests.length > 0) {
      throw new Error("This name is already used");
      //   return res.status(422).json({ error: "This name is already used" });
    } else {
      // check contest status.one time can have a active contest
      const activeContest = await Contest.find({ status: "Active" });
      if (activeContest.length > 0) {
        throw new Error("One contest is already activated");
        //   return res
        //     .status(422)
        //     .json({ error: "One contest is already activated" });
      } else {
        const contestModel = new Contest({
          name: name,
          startDate: startDate,
          endDate: endDate,
          ticketNumbers: ticketNumbers,
          chooseprices: chooseprices,
          mainPrice: mainPrice,
          status: status,
        });
        const createContest = await contestModel.save();

        //generate tickets
        const numberOfTickets = createContest.ticketNumbers;
        const contestId = createContest._id.toString();

        for (let i = 0; i < numberOfTickets; i++) {
          const randomString = makeid(10);

          const ticketModel = new Ticket({
            ticketId: randomString,
            contestId: contestId,
          });
          await ticketModel.save();
        }
        return createContest;
      }
    }
  } catch (err) {
    throw err;
  }
};

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.getContestList = async () => {
  try {
    const contestList = await Contest.find();
    return contestList;
  } catch (err) {
    throw err;
  }
};

exports.getContestById = async (contestId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      throw new Error("No such Contest");
    }

    const contest = await Contest.findById(contestId);

    if (!contest) {
      throw new Error("No such Contest");
    }

    return contest;
  } catch (err) {
    throw err;
  }
};