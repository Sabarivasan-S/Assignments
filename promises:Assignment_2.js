//Program uses chaining promises for finding the number of user with a given
//name and their ids
let readline=require('readline');
let rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
let names=[     //sample data entries
    {id:1,'name':'name1'},
    {id:2,'name':'name2'},
    {id:3,'name':'name2'},
    {id:4,'name':'name3'}
];

function finder(n){ //function which adds the persons with given name and push them to
    return new Promise(function(resolve,reject){ //seperate array
        let a=[];
        for(let r=0;r<names.length;r++){
            if(n==names[r].name){
                a.push(names[r]);
            }
        }
        if(a.length==0) reject(0);
        resolve(a);
    })
    
}
function len(a){    //function to print the ids and no of persons with the given name 
    return new Promise(function(resolve,reject){
        if(a==0) reject(0);
        for(let f=0;f<a.length;f++){
            console.log('id : '+a[f].id);
        }
        console.log('Occurs '+a.length+' times');
        resolve(a.length); 
    })
}
rl.question('Enter the name  ',(data)=>{  //receives the name from console
    rl.close();
    finder(data).then((message)=>{len(message)}).then((message)=>{}).catch(()=>{ //chained promises 
        console.log(`no person found with  ${data}`);
    })
});



