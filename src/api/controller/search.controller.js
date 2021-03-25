const Clinical = require("../models/clinical.model");
const { MSG } = require("../utils/messages");
const handleResponse = require("../utils/handleResponse");
const APIError = require("../utils/APIError");
const axios = require("axios");

exports.insertData = async (req, res, next) => {
  try {
    let { url } = req.body;
    let data = await axios.get(url);

    let requiredData = [];
    for (let d of data.data) {
      let doc = {
        updateOne: {
          filter: { case_id: d.case_id },
          update: {
            case_id: d.case_id,
            tumor_site: d.tumor_site,
            BMI: d.BMI,
            height_in_cm: d.height_in_cm,
            weight_in_kg: d.weight_in_kg,
          },
          upsert: true,
        },
      };
      requiredData.push(doc);
    }

    await Clinical.bulkWrite(requiredData);
    handleResponse.success(res, { message: MSG.SAVED, status: "Success" }, 200);
  } catch (error) {
    handleResponse.error(
      res,
      new APIError({
        message: MSG.SAVED_ERROR,
        errors: error,
        status: 400,
      })
    );
  }
};
exports.searchClinincalData = async (req, res, next) => {
  try {
    let { caseId } = req.query;

      let data = await Clinical.find({ case_id: caseId });
      if(data.length){
        handleResponse.success(res, data, 200);

      }else{
        handleResponse.success(res, {message: MSG.DATA_NOT_FOUND, status: MSG.FAILED}, 403);

      }
    
  } catch (error) {
    handleResponse.error(
      res,
      new APIError({
        message: MSG.NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};
