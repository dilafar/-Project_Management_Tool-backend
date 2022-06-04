const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const panelDataSchema = new Schema({
    
    panel: {
        type : String,
        required : true
    },
    type: {
        type: String,
        default: "pending",
      },
    createdAt:{
        type: Date,
        default: new Date()
    }
}
,
{
    timestamps: true,
}
)

const PanelDatamodel = mongoose.model("PanelData", panelDataSchema);
module.exports = PanelDatamodel;