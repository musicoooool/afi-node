const soap = require("soap");
const fs = require("fs");
const X2JS = require('x2js');
const moment = require("moment");

// const SOAP_URL = "http://127.0.0.1:28120/WebService.asmx?WSDL";
const SOAP_URL = "http://10.9.3.1:8888/WebService.asmx?WSDL";
// const SOAP_URL = "http://10.9.5.40/wim/services/ws?wsdl";
const soapClient = soap.createClientAsync(SOAP_URL);
const parser = new X2JS();
const THREADS = 50;
const MAX = 200;
const TIME_TOTAL = 15000;
let resultMap = new Map();
let TASKID = 0;

const TEST_METHOD = "getGoods";

// var url = "http://www.crcind.com/csp/samples/SOAP.Demo.CLS?WSDL=1";
// var args = {
//   Arg1: 1,
//   Arg2: 2
// };
// soap.createClient(url, function (err, client) {
//   client.AddInteger(args, function (err, result) {
//     console.log(result);
//   });
// });
const getJSONResult = (xml) => {
  // let result = parser.xml2js(xml[1]).Envelope.Body.getEmployeeResponse.return;
  let result = xml[0].return;
  // console.log("result",result);
  return parser.xml2js(result);
}
const analysis = () => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;
  let total = 0;
  let rowsTotal = 0;
  let errors = 0;
  let result = Array.from(resultMap.values()).map(t => {
    min = Math.min(min, t.consume);
    max = Math.max(max, t.consume);
    total += t.consume;
    rowsTotal += t.result.ROW?t.result.ROW.length:0;
    errors += Math.abs(parseInt(t.result.ERR_CODE?t.result.ERR_CODE:'1'));
    return {
      VER: t.result.VER,
      LENGTH: t.result.ROW?t.result.ROW.length:0,
      CONSUME: t.consume
    }
  });
  // let resultString = JSON.stringify(Array.from(resultMap.values()).map(t => {
  //   return {
  //     VER: t.result.VER,
  //     LENGTH: t.result.ROW.length,
  //     CONSUME: t.consume
  //   }
  // }));
  // console.log(resultString);
  let summary = {
    min,
    max,
    total,
    avg: total / MAX,
    avgRows: rowsTotal / MAX,
    errors
  };
  log(summary,result);
  console.log(summary);
}
const tester = async (method, args = null) => {

  let taskid = ++TASKID;
  let startTime = new Date();
  let client = await soapClient.then(c => c[method + "Async"]);
  let result = await client(args).then(response => getJSONResult(response).DBSET).catch(err => {return {}});
  let endTime = new Date();
  resultMap.set(taskid, {
    result,
    consume: (endTime - startTime) / 1000
  });
  console.log(`task ${taskid} is end, ${resultMap.size}/${MAX}`);
  if (resultMap.size == MAX) {
    analysis();
  }
}

const groupTester = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    tester(TEST_METHOD);
  }
}

const splitTask = () => {
  let times = MAX / THREADS;
  let interval = TIME_TOTAL / times;
  for (let i = 0; i < times; i++) {
    setTimeout(groupTester, interval * i, THREADS);
  }
}

const log = (summary,original_data) => {
  let date = moment().format("YYYYMMDDHHmmss");
  let fileName = `./logs/test-${TEST_METHOD}-${date}.json`;
  let content = {
    test_name: TEST_METHOD,
    test_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    test_uri: SOAP_URL,
    group_requests:THREADS,
    total_requests:MAX,
    request_time: TIME_TOTAL/1000,
    summary,
    original_data,
  };
  fs.writeFile(fileName, JSON.stringify(content), (err) => {
    console.log("err",err);
    console.log("log over.");
  });
}

splitTask();


// soap.createClient("http://127.0.0.1:28120/WebService.asmx?WSDL", function (err, client) {
//   client["getEmployee"](function (err, result) {
//     let data = result["return"];
//     console.log("xml", data);
//     console.log("json", x2js.xml2js(data).DBSET.ROW);
//   });
// });