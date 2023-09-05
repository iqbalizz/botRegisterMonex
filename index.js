import fetch from "node-fetch";
import faker from "faker";
import readlineSync from "readline-sync";
import chalk from "chalk";

//!FUNCTION GET RANDOM NAME
function generateRandomIndonesianName() {
    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    return {
        randomFirstName,
        randomLastName
    };
};

//!GENERATE RANDOM NOMER HP
function generateRandomPhoneNumber() {
    const randomPhoneNumber = `0821${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`;
    return randomPhoneNumber;
}

//!FUNCTION DELAY
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getCookie = () => new Promise((resolve, reject) => {
    const dataString = `{"token":null,"language":null}`
    fetch(`https://monex-in.com/api/api/index/webconfig`, {
        method: 'POST',
        headers: {
            'Host': 'monex-in.com',
            'Content-Length': '30',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.141 Safari/537.36',
            'Sec-Ch-Ua-Platform': '""',
            'Origin': 'https://monex-in.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://monex-in.com/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        body: dataString
    })
        .then(async res => {
            const getValue = {
                cookie: res.headers.raw()[`set-cookie`],
                body: await res.text()
            }
            resolve((getValue))
        })
        .catch(error => reject(error))
});

const registerAccount = (Name, randomPhone, cookie) => new Promise((resolve, reject) => {
    const dataString = `{"password":"HaloBrow32112345","spassword":"${Name}32112345","mobile":"${randomPhone}","t_mobile":"8449","code":"","agent":10000,"token":null,"language":"id_ind"}`
    fetch(`https://monex-in.com/api/api/index/register`, {
        method: 'POST',
        headers: {
            'Host': 'monex-in.com',
            'Content-Length': '155',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.141 Safari/537.36',
            'Sec-Ch-Ua-Platform': '""',
            'Origin': 'https://monex-in.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://monex-in.com/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': cookie
        },
        body: dataString
    })
        .then(async res => {
            const getValue = {
                cookie: res.headers.raw()[`set-cookie`],
                body: await res.json()
            }

            const resultAll = {
                ...getValue
            }
            resolve(resultAll)
        })
        .catch(error => reject(error))
});

(async () => {
    //!Get Function Generate Name
    const getName = await generateRandomIndonesianName();
    const Name = getName.randomFirstName;
    //!Get Function Generate Random Phone Number
    const getPhoneNumber = await generateRandomPhoneNumber();
    // console.log(getPhoneNumber)
    // console.log(Name)
    const resultCookie = await getCookie();
    // console.log(resultCookie)
    const generateCookie = resultCookie.cookie;
    const cookie = generateCookie[0].split(";")[0];
    let inputJumlahReff;
    if (cookie !== undefined) {
        console.log(`[!] ${chalk.green(`Berhasil mendapatkan cookie`)}`)
        inputJumlahReff = readlineSync.question(`[?] Masukkan Jumlah reff : `);
        for (let i = 0; i < inputJumlahReff; i++) {
            console.log(`[!] ${chalk.yellow(`Procces Refferal ke-${i + 1}`)}`)
            const registAcc = await registerAccount(Name, getPhoneNumber, cookie);
            const resultBody = registAcc.body;
            const statusRegister = resultBody.info.id_ind;
            const token = resultBody.data.token;
            console.log(`[!] Status Register : ${chalk.green(statusRegister)}!`)
            // console.log(token)
            await delay(2000)
        }
    }
    console.log(`[!] ${chalk.green(`${inputJumlahReff} Refferal is complete.. Check Refferal Kamu`)}`);
})();