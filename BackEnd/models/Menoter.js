var mongoose = require("mongoose");

var MentorSchema = new mongoose.Schema({
  mentor_name: String,
  mentor_email: String,
  mentor_task: [
    {
      taskName: {
        type: String,
        default: null
      },
      taskDesc: {
        type: String,
        default: null
      }
    }
  ],
  write_date: {
    type: Date,
    default: () => new Date().getTime() + 1000 * 60 * 60 * 9
  }
});

module.exports = mongoose.model("mentor", MentorSchema);
