let readline=require('readline');

let rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
let names=[ //sample data entries
    {id:1,'name':'name1'},
    {id:2,'name':'name2'},
    {id:3,'name':'name2'},
    {id:4,'name':'name3'}
];

function finder(n){ //function which adds the persons with given name and push them to
    let a=[];       //seperate array
    for(let r=0;r<names.length;r++){
        if(n==names[r].name){
            a.push(names[r]);
        }
    }
    if(a.length==0) return 0;
    return a;
}
function len(a){    //function to print the ids and no of persons with the given name 
    if(a==0) return 0;
    for(let f=0;f<a.length;f++){
        console.log('id : '+a[f].id);
    }
    return a.length;
}
function main(nm,callback1,callback2){ //main function which has two callbacks
    let similar=callback2(callback1(nm));
    if(similar==0){
        return console.log(`No person with ${nm} found`);
    }
    return console.log('Occurs '+similar+' times');
}

rl.question('Enter the name  ',(data)=>{    //receives name for console
    rl.close();
    main(data,finder,len);//call of main function
});





