/* eslint-disable import/no-extraneous-dependencies */
import Joi from '@hapi/joi';

const schemas = {};

const password = Joi.string()
  .min(8)
  .required()
  .label('Password is required,  it must have at least 8 letters');

const name = Joi.string()
  .min(3)
  .required()
  .label('First and Last name is required,  it must have at least 3 letters');
const phonenumber = Joi.string()
  .min(10)
  .required()
  .label('Phone is required,  it must have at least 10 digits');

const drivingnglicenceid = Joi.string()
  .min(3)
  .required()
  .label('Driving lisence is required');

const imageurl = Joi.string()
  .min(5)
  .required()
  .label('Profile image or driving licence image is required');

const driverid = Joi.string()
  .min(3)
  .required()
  .label('Driver id is required');

const clientname = Joi.string()
  .min(3)
  .required()
  .label('Client name is required');

const profileimage = Joi.string()
  .min(3)
  .required()
  .label('Profile image is required');

const triporigin = Joi.string()
  .min(3)
  .required()
  .label('Trip origin is required');

const tripdestination = Joi.string()
  .min(3)
  .required()
  .label('Trip destination is required');

schemas.login = Joi.object().keys({
  phonenumber,
  password,
});

schemas.driver = Joi.object().keys({
  name,
  phonenumber,
  profileimage,
  drivinglicenceimage: imageurl,
  drivingnglicenceid,
  password,
});

schemas.updateDriver = Joi.object().keys({
  name,
  phonenumber,
  profileimage: imageurl,
  drivinglicenceimage: imageurl,
  drivingnglicenceid,
});

schemas.aproveOrReject = Joi.object().keys({
  status: Joi.string()
    .min(3)
    .required()
    .label('Status is required'),
});

schemas.trip = Joi.object().keys({
  driverid,
  clientname,
  clientphonenumber: phonenumber,
  triporigin,
  tripdestination,
});

export default schemas;
