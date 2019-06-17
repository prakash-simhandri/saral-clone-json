const express = require('express');
const fs = require('fs');
var app = express()
app.use(express.json())

app.get('/fullCouress',(req,res)=>{
    let open_couress = JSON.parse(fs.readFileSync('saral_courses.json'));
    console.log('open data :)')
    let newList = [];
    for(let List_ of open_couress){
        let sho_dic = {
            "name":List_.name,
            "description":List_.description,
            "id":List_.id
        }
        newList.push(sho_dic);
    }
    return res.send(newList);
    
})

app.post('/newCouress',(req,res)=>{
    let open_couress = JSON.parse(fs.readFileSync('saral_courses.json'));
    var new_data = {
        "name":req.body.name,
        "description":req.body.description,
        "id":open_couress.length+1,
        "exercise":[]
    }
    open_couress.push(new_data);
    fs.writeFileSync('saral_courses.json',JSON.stringify(open_couress,null,2));
    console.log('new Data add......');
    return res.send(open_couress);
})

app.get('/oneCouress/:id',(req,res)=>{
    let open_couress = JSON.parse(fs.readFileSync('saral_courses.json'));
    let newList = [];
    for (var dic_id of open_couress){
        if (dic_id.id == req.params.id){
            let sho_dic = {
                "name":dic_id.name,
                "description":dic_id.description,
                "id":dic_id.id
            }
            newList.push(sho_dic);
        }
    }
    return res.send(newList);
})

app.put('/update/:id',(req,res)=>{
    let open_couress = JSON.parse(fs.readFileSync('saral_courses.json'));
    
    for (var index_id of open_couress){
        if(index_id.id == req.params.id){
            var dic_index = open_couress.indexOf(index_id);
            var Old_exercise = index_id.exercise;
        }
    }
    let dic = {
        "name":req.body.name,
        "description":req.body.description,
        "id":req.params.id,
        "exercise":Old_exercise,

    }
    open_couress[dic_index]=dic
    fs.writeFileSync('saral_courses.json',JSON.stringify(open_couress,null,2));
    return res.send(open_couress);
    
})
app.get('/couress/fullExercise',(req,res)=>{
    let exercise_dic = JSON.parse(fs.readFileSync('saral_courses.json'));
    let onlyExercies = [];
    for (let Exercise of exercise_dic){
        let new_lists = []
        for(onlyExes of Exercise.exercise){
            let data_dic ={
                "name":onlyExes.name,
                "description":onlyExes.description,
                "courseId":onlyExes.courseId,
                "id":onlyExes.id
            }
            new_lists.push(data_dic);
        }
        onlyExercies.push(new_lists);
    }
    return res.send(onlyExercies)
})


app.get('/course/exercise/:id',(req,res)=>{
    let data = fs.readFileSync('saral_courses.json');
    let Data = JSON.parse(data);
    let exercise=Data[req.params.id-1]["exercise"]
    let new_List=[]
    for(only_exersises_dic of exercise){
        let dic ={
            "name":only_exersises_dic.name,
            "description":only_exersises_dic.description,
            "courseId":only_exersises_dic.courseId,
            "id":only_exersises_dic.id
        }
        new_List.push(dic);
    }
    return res.send(new_List);
})


app.post('/couress/:id/newExercise',(req,res)=>{
    let exercise_dic = JSON.parse(fs.readFileSync('saral_courses.json'));
    for (var e_list of exercise_dic){
        if(e_list.id == req.params.id){
            var one_dic = e_list;
            var exe_list = e_list.exercise;    
        }
    }

    let exe_dic = {
        "name":req.body.name,
        "description":req.body.description,
        "courseId":req.params.id,
        "id":exe_list.length+1,
        "submissions":[]
    }
    let exercise_index = exercise_dic.indexOf(one_dic);
    exercise_dic[exercise_index]["exercise"].push(exe_dic);
    fs.writeFileSync('saral_courses.json',JSON.stringify(exercise_dic,null,2));
    return res.send(exe_dic);

})
app.get('/couress/:id/exercise/:Id',(req,res)=>{
    let Sho_exercise_dic = JSON.parse(fs.readFileSync('saral_courses.json'));
    for(let fast_dic of Sho_exercise_dic){
        if(fast_dic.id == req.params.id){
            for(let second_dic of fast_dic.exercise){
                if(second_dic.id == req.params.Id){
                    let onlyOneDic ={
                        "name":second_dic.name,
                        "description":second_dic.description,
                        "courseId":second_dic.courseId,
                        "id":second_dic.id
                    }
                    return res.send(onlyOneDic);
                }
            }
        }   
    }
})

app.put('/couress/:id/updateExercise/:Id',(req,res)=>{
    let upDateExe = JSON.parse(fs.readFileSync('saral_courses.json'));
    for(let cours_dic of upDateExe){
        if(cours_dic.id == req.params.id){
            var cores_index = upDateExe.indexOf(cours_dic);
            for(let ex_list of cours_dic.exercise){
                if(ex_list.id == req.params.Id){
                    var ex_index =cours_dic.exercise.indexOf(ex_list);
                    var dic_exe ={
                        "name":req.body.name,
                        "description":req.body.description,
                        "courseId":req.params.id,
                        "id":req.params.Id,
                        "submissions":ex_list.submissions
                    }
                }
            }
        }
    }
    upDateExe[cores_index]["exercise"][ex_index] = dic_exe
    fs.writeFileSync('saral_courses.json',JSON.stringify(upDateExe,null,2));
    return res.send(dic_exe);
})

app.get('/couress/:id/exercise/:Id/submissions',(req,res)=>{
    let data_subm =  JSON.parse(fs.readFileSync('saral_courses.json'));
    let submissions = data_subm[req.params.id-1]["exercise"];
    let one_subm = submissions[req.params.Id-1]["submissions"]
    return res.send(one_subm);
})

app.post('/couress/:id/exercise/:Id/NewSubmissions',(req,res)=>{
    let new_submissions = JSON.parse(fs.readFileSync('saral_courses.json'));
    for (let cours_dics of new_submissions){
        if(cours_dics.id == req.params.id){
            var index_corse = new_submissions.indexOf(cours_dics);
            for(exercises_dic of cours_dics.exercise){    
                if(exercises_dic.id == req.params.Id){
                    var index_exercise = cours_dics.exercise.indexOf(exercises_dic);
                    var SU_count = exercises_dic.submissions.length+1
                    var new_subissn = {
                        "userName":req.body.userName,
                        "content":req.body.content,
                        "courseId":req.params.id,
                        "exerciseId":req.params.Id,
                        "id":SU_count
                    }
                }
            }
        }
    }
    new_submissions[index_corse]["exercise"][index_exercise]["submissions"].push(new_subissn);
    fs.writeFileSync('saral_courses.json',JSON.stringify(new_submissions,null,2));
    return res.send(new_subissn);
})
var servar = app.listen(7171,()=>{
    console.log('Example app listening.....')
})