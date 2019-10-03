import crypt from 'bcryptjs';
import help from '../helpers/helper'
import conflicts from '../models/index';
import mymodel from '../models/users_db';
import ReflectionModel from '../models/Reflection';

const XController = {
creates (req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({'message': 'All fields are required'})
    }

    const datas = ReflectionModel.create(req.body);
    if (datas) {
      return res.status(201).send({message : `Hy You added Successfully `, datas});
    }
    else{
      return res.status(201).send({message : `Hy something Wrong Occured `});
    }

  },  
  async create (req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({'message': 'All fields are required'})
    }

    const reflection = ReflectionModel.create(req.body);
    if (reflection) {
      const datas = await ReflectionModel.insert_into_DB(req.body);
      return res.status(201).send({message : `Hy You added Successfully `, datas});
    }
    else{
      return res.status(201).send({message : `Hy something Wrong Occured `});
    }

  },
  getAlls(req, res) {
    const reflections = ReflectionModel.findAll();
    return res.status(200).send(reflections);
  },
  async getAll(req, res) {
    const datas = await ReflectionModel.findAll_into_DB()
    if (datas) {
      return res.status(200).send(datas);
    }
  },

  getOnes : (req, res) => {
    const reflection = ReflectionModel.findOne( parseInt(req.params.id));

    if (!reflection) {
      return res.status(404).send({'message': 'reflection not found'});
    }
    return res.status(200).send(reflection);
  },
  async getOne(req, res) {
    const datas = await ReflectionModel.findOne_into_DB( parseInt(req.params.id));
    // console.log(datas[0].id);
    if (datas.length === 0) {
      return res.status(404).send({message: 'reflection not found'});
    }
    return res.status(200).send({message: 'reflection retrieved Successfully', datas});
  },
  
  updates : (req, res) => {
    const reflection = ReflectionModel.findOne(parseInt(req.params.id));
    if (!reflection) {
      return res.status(404).send({'message': 'reflection not found'});
    }
    const updatedReflection = ReflectionModel.update(parseInt(req.params.id), req.body)
    return res.status(200).send(updatedReflection);
  },
  async update(req, res) {
    const datas_id = await ReflectionModel.findOne_into_DB( parseInt(req.params.id));
     if (datas_id.length === 0) {
       return res.status(404).send({message: 'reflection not found'});
     }
    const retrieve_this_user = await ReflectionModel.findOne_into_DB( parseInt(req.params.id));
    // console.log(retrieve_this_user[0].success);
    const data_to_insert = {
      success:req.body.success || retrieve_this_user[0].success, 
      lowPoint:req.body.lowPoint || retrieve_this_user[0].low_point, 
      takeAway:req.body.takeAway || retrieve_this_user[0].take_away}
    const datas = await ReflectionModel.update_into_DB(data_to_insert, parseInt(req.params.id));
    return res.status(200).send({message: 'reflection updated Successfully', datas});
   },

  deletes : (req, res) => {
    const reflection = ReflectionModel.findOne(parseInt(req.params.id));
    if (!reflection) {
      return res.status(404).send({'message': 'reflection not found'});
    }
    const ref = ReflectionModel.delete(parseInt(req.params.id));
    return res.status(204).send(ref);
  },
  async delete(req, res) {
    const datas_id = await ReflectionModel.findOne_into_DB( parseInt(req.params.id));
     if (datas_id.length === 0) {
       return res.status(404).send({message: 'reflection not found'});
     }

    const datas = await ReflectionModel.delete_into_DB( parseInt(req.params.id));
    return res.status(200).send({message: 'Those reflection are Successfully deleted ', datas});
   },

  sign : (req, res) => {

      const saltRound = 12;
      const Account_created =  new Date();
      const {name, email, password, confirm_password} = req.body;
      if (!name) { return res.status(400).json({message: `Hy insert username please `}); }
      if (!email) { return res.status(400).json({message: `Hy ${name} insert email please `}); }
      if (!password) { return res.status(400).json({message: `Hy ${name} insert password please `}); }
      if (!confirm_password) { return res.status(400).json({message: `Hy ${name} insert confirmation password please `}); }
  
      const give_format_name = name.toString().trim().toLowerCase();
      const give_format_email = email.toString().trim().toLowerCase();
      const condition = /^(([a-zA-Z0-9\.-_]{2,6})+)@(([a-zA-Z0-9]{2,6})+).([a-z]{2,6})(.[a-z]{2,6})$/;
      if (!condition.test(give_format_email)) {  return res.status(400).json({message: `Hy ${name} insert Valid email please `}); }
      
      const exist_email = mymodel.check_email(give_format_email);
      if (exist_email) { return res.status(400).json({message: `Hy ${name} this email ${email} is already exist please use another email`}); }
        
      const give_format_password = password.toString().trim().toLowerCase();
      const give_format_confirm_password = confirm_password.toString().trim().toLowerCase();
      if (give_format_password.length < 6) { return res.status(400).json({message: `Hy ${name} Your password should be above 6 characters`}); }
      if (give_format_password.search(/[0-9]/) === -1) { return res.status(400).json({message: `Hy ${name} Your password should contain at least one number`}); }
      if (give_format_password.search(/[!\@\#\$\%\&\*\~\`\:\""\''\'\"\?\/\,\.]/) === -1) { return res.status(400).json({message: `Hy ${name} Your password should contain at least one special character`});}
      if (give_format_password !== give_format_confirm_password) { return res.status(400).json({message: `Hy ${name} Your confirmation password is incorrect `}); }

      
      const Name = give_format_name; const Email = give_format_email;
      crypt.hash(give_format_password, saltRound,(err, hash) => {
       
        if(err) res.status(400).send({ message: `Hy ${name} check your password again`});
        
        else{
          mymodel.signup_user(give_format_name, give_format_email, hash, Account_created);
          const find_id_of_this_user = mymodel.users.find((this_user) => this_user.email === give_format_email );
          const link = `localhost:2000/api/v1/test/${find_id_of_this_user.id}`;
          const visit_account = `You can use this ${link} to visit your account`;
          res.status(201).send({ message: `Hy ${name} your account have successfully created on ${Account_created}`, your_account : { Name, Email, visit_account} });
        }});

  },
  signup :(req, res) => {
      
      const saltRound = 12;
      const account_created =  new Date();
      const {name, email, password} = req.body;
      const empty_name = help.check_name_if_is_empty(name);
      if (empty_name) { return res.status(400).json({message: `Hy insert username please `}); }
      const empty_email = mymodel.check_email_if_is_empty(email);
      if (empty_email) { return res.status(400).json({message: `Hy ${req.body.name} insert email please `}); }
      const checked_if_inserted_email = help.check_email(email);
      if (checked_if_inserted_email) { return res.status(400).json({message: `Hy ${req.body.name} insert valid email please `}); }
      const is_this_email_exist = mymodel.check_email(email);
      if (is_this_email_exist) { return res.status(400).json({message: `Hy ${req.body.name} this email is already exist please use another email`}); } 
      const empty_password = help.check_password_if_is_empty(password); 
      if (empty_password) { return res.status(400).json({message: `Hy ${req.body.name} insert password please `}); }
      const check_if_strong = help.check_strong_password(password); 
      if (check_if_strong) { return res.status(400).json({message: `Hy ${req.body.name} use strong password like this qwerty@123 `}); }
      const check_if_is_sample = help.check_if_this_password_sample(password);
      if (check_if_is_sample) { return res.status(400).json({message: `Hy ${req.body.name} you are not allowed to use this password qwerty@123 please use another`}); }
        
      crypt.hash(password.toString().trim().toLowerCase(), saltRound, (err, hash) => {
                if(err) res.status(400).send({ message: `Hy ${req.body.name} check your password again`});
                else{
                  const data_to_display =`Hy ${name} your account have successfully created on ${account_created}` && mymodel.signup_user(name.toString().trim().toLowerCase(), email.toString().trim().toLowerCase(), hash, account_created);
                  res.status(201).send({ message: `Hy ${name} your account have successfully created on ${account_created}`, user: data_to_display });
                }});
  },
  view :(req, res) => {

   res.status(200).send({ message: `Hey Hope you are retrieving all data`, data: mymodel.users });
  }
}

module.exports = XController;