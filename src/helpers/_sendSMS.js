/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const checkCode = (number) => number.startsWith('+25');
export const addCode = (number) => '+25'.concat(number);

export const sendSms = async (smsData) => {
  console.log(`PID: ${process.pid} === SENDING SMS ===`);

  try {
    await axios.post(
      process.env.PINDO_URL,
      {
        sender: smsData.sender,
        to: checkCode(smsData.receiver) ? smsData.receiver : addCode(smsData.receiver),
        text: smsData.body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.PINDO_TOKEN}`,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
};
