const { model, Schema } = require("mongoose");

const AudioSchema = new Schema(
  {
    caption: {
      required: true,
      type: String,
    },
    filename: {
      required: true,
      type: String,
    },
    fileId: {
      required: true,
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = model("audio", AudioSchema);
