const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const studentModel = require('../model/studentmodel')



const createstudent = async function (req, res) {
  try {
    let data = req.body;

    const { name, marks, subject, rollno } = data;

    if (Object.keys(data).length === 0)
      return res.status(400).send({ status: false, msg: "Please provide data in the request body!" })

    // let studentfind= await userModel.findOne({ rollno:rollno})
    //     for(let rollno in userModel){
    //       if(rollno)   return res.status(400).send({ status: false, message: `student is already present.` }); 
    //  else
    //              await userModel.create(data)
    //     }
    let studentfind = await studentModel.findOne({ rollno: rollno })
    if (studentfind)
      return res.status(400).send({ status: false, message: `student is already present.` });
    const studentcreate = await studentModel.create(data)
    return res.status(201).send({ status: true, data: studentcreate })

  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

//====================Get Api Cart===================================
const getStudent = async function (req, res) {
  try {
    let rollno = req.body.rollno;
    let name = req.body.name;
    
    let userrollno = await studentModel.findOne({ $or: [ { rollno: rollno }, { name: name } ] });
    
    if (!userrollno)
      return res.status(400).send({ status: false, message: "user Not found" });
    return res.status(200).send({ status: true, message: userrollno });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


//---------------------------------------------UPDATE API-------------------------------------------------

const updateapi = async function(req,res)
{
    try
    {
        const name = req.body.name
        const marks = req.body.marks

       

        let findname = await studentModel.find({name:name})
        console.log(findname)

        if(!findname ){
            return res.status(404).send({status:false, message:'findname not Exist '})
        }        
        

        let updateData = await studentModel.findOneAndUpdate({name:name}, {$set:{marks:marks}}, {new:true})

        res.status(200).send({status:true, message:'studentModel Updated Successfully', data:updateData})


    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).send({status:false, Error:err.message})
    }

}

module.exports = { createstudent, getStudent,updateapi }








// let data1 = await stModel.findOne({ Name: Name, subject: subject, marks: marks })
//   let somthing1 = data1.Marks

//   let data2 = await stModel.findOneAndUpdate({ Name: Name, subject: subject, marks: marks }, { $set: { marks: marks } }, { new: true })
//   let somthing2 = data.Marks
// let something3=somthing1+somthing2
// res .status(200).send({msg:something3})
// module.exports={createUser,loginUser}