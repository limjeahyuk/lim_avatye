//index.js

// Express 기본 모듈 불러오기
const express = require('express');

// mysql 불러오기
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

// 업로드용 미들웨어
const cors = require('cors');
const bodyparser = require('body-parser');
const multer = require("multer");
const path = require("path");

const session = require("express-session");
const MYSQLStore = require("express-mysql-session")(session);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "client/public/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    },
});

const upload = multer({
    storage : storage
});

const sessionOption = {
    secret: 'HYUK_SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(dbconfig),
    cookie: {secure : false}
}

// jwt 사용...
const jwt = require('jsonwebtoken');
const { parse } = require('path');
const HYUK_TOKEN = 'HYUK_SECRET_KEY';

//객체생성
const app = express();

// body-parser를 이용하여 json 파싱
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOption));

app.use(cors({
    // 데이터 요청을 하면 origin이라는 헤더를 포함.
    // orgin은 도메인 형태를 띄는 데 이것을 모두 허용.
    origin: true,
    // access-control-allow-credentials 를 true > 왜인지 너무 길어용..
    credentials: true
}));

// 기본 속성 설정
app.set('port', process.env.PORT || 8080);

const util = {
    success: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    fail: (status, message) => {
        return {
            status: status,
            success: false,
            message: message
        }
    }
}

// 전체 조회
app.get('/', (req, res) => {
    connection.query('SELECT * FROM product', (error, rows) => {
        if (error) throw error;
        console.log(rows);
        res.json(rows);
    })
})

// username를 이용한 user 조회
app.get('/user/:name', (req, res) => {
    const selectname = (req.params.name);
    connection.query(`SELECT * FROM user WHERE username = "${selectname}"`,
        (error, rows) => {
            if (error) throw error;
            res.json(rows);
        });
})

// userid를 이용한 구매한 내역 user , product , order 조회
app.get('/mypage/:id', (req, res) => {
    const selectid = parseInt(req.params.id);
    connection.query(`SELECT * FROM \`order\`, product, user 
    WHERE \`order\`.proid = product.proid and \`order\`.username = user.username and user.userid = ${selectid}`,
        (error, rows) => {
            if (error) throw error;
            res.json(rows);
    })
})

// userid를 이용하여 판매 상품 내역 조회 user, product
app.get('/pro/:id', (req, res) => {
    const selectid = parseInt(req.params.id);
    connection.query(`SELECT * FROM user, product WHERE user.userid = product.userid and user.userid = ${selectid}`,
        (error, rows) => {
            if (error) throw error;
            res.json(rows);
    })
})

// 클릭시 item 조회
app.get('/item/:id', (req, res) => {
    const selectid = parseInt(req.params.id);
    connection.query(`SELECT * FROM product, user WHERE product.userid = user.userid and proid = ${selectid}`,
        (error, rows) => {
            if (error) throw error;
            res.json(rows);
        });
});

//username을 이용하여 email 조회
app.get('/email/:name', (req, res) => {
    const selectname = req.params.name;
    connection.query(`SELECT * FROM user WHERE username = '${selectname}'`,
        (error, rows) => {
            if (error) throw error;
            res.json(rows);
        });
});

// login 확인
app.post('/login', function (req, res) {
    const rb = req.body;
    const username = rb.username;
    const userpassword = rb.password;
    if (username && userpassword) {
        connection.query('SELECT * FROM user WHERE username = ? AND userpw = ?',
            [username, userpassword], (error, rows) => {
                if (error) throw error;
                if (rows.length > 0) {
                    // jwt 처리
                    jwt.sign({
                        userid: rows[0].userid,
                        username: rows[0].username
                    }, HYUK_TOKEN,
                        {
                        expiresIn:'1h'
                        }, (err, token) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ ...rows, token: token });
                            }   
                    })
                    // session 처리
                    // req.session.displayName = username
                    // req.session.save(() => {
                    //     res.json(rows)
                    // })
            } else {
                res.send("dd");
            }
        });
    } else {
        res.send("dd"); // 아예 안씀
    }
})

// id 중복체크
app.post('/valid', function (req, res) {
    const rb = req.body;
    const username = req.body.username;
    if (username) {
        connection.query('SELECT * FROM user WHERE username = ?',
            [username], (error, rows) => {
                if (error) throw error;
                if (rows.length > 0) {
                    res.send('no'); // 중복있음
                } else {
                    res.send("good"); // 중복된거 없음
                }
            });
    } else {
        res.send("dd"); // 아예 안씀
    }
})

//user 등록
app.post('/sign', function (req, res) {
    console.log('console : %j', req.body);
    const rb = req.body;
    const username = rb.username;
    const userpw = rb.userpw;
    const usernick = rb.usernick;
    const email = rb.email;

    if (username && userpw && usernick) {
        const query = `INSERT INTO user(username, userpw, usernick, email) 
        VALUE('${username}','${userpw}','${usernick}','${email}')`;
        connection.query(query, (err, row) => {
            if (err) throw err;
            return console.log("insert good");
        });
        res.json(req.body);
    } else {
        res.send('빈칸있어요')
    }
})

// img 선택 눌렀을 때, img 저장.
app.post("/img", upload.single('img'), async (req, res) => {
    const image = req.file.path;
    console.log(req.file);
    if (image === undefined) {
        return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다."));
    }
    res.status(200).send(util.success(200, "요청성공", image));
})

// post > db 저장
app.post("/post", function (req, res) {
    console.log('console : %j', req.body);
    const rb = req.body;
    const userid = rb.userid;
    const proname = rb.proname;
    const procont = rb.procont;
    const price = rb.price;
    const proimg = rb.proimg;
    const proca = rb.proca;
    const quantity = rb.quantity;

    const query = `INSERT INTO product(USERID ,PRONAME, PROCONT, PRICE, PROIMG, PROCA, QUANTITY) VALUE
    ('${userid}','${proname}','${procont}','${price}','${proimg}','${proca}','${quantity}')`;
    connection.query(query,
        (err, rows) => {
            if (err) throw err;
            return console.log("insert success");
        });
    res.json(req.body);
})

// 제품 구매버튼 눌렀을 때 order 테이블에 저장. 후 product 테이블 수량 변경
// 트랜잭션으로 한번에 해버림.
 function itemcount(req, res) {
    const rb = req.body;
    const proid = rb.proid;
    const username = rb.username;
    const count = rb.count;
    const orderdate = rb.orderdate;
    const ordertype = rb.type;
    const orderinfo = rb.data;
    const orderemail = rb.email;
    const query = `start transaction;
    INSERT INTO \`order\`(PROID, USERNAME, COUNT, ORDERDATE, ORDERTYPE, ORDERINFO, ORDEREMAIL) VALUE
     (${proid},'${username}',${count}, '${orderdate}', '${ordertype}' ,'${orderinfo}','${orderemail}');
    UPDATE product SET quantity=quantity-${count} WHERE proid = ${proid};
    commit;
    `
    connection.query(query, (err, rows) => {
        if (err) throw err;
        return res.send('주문이 완료되었습니다.')
    });
}

// 주문클릭했을 시 수량 확인.
app.post('/buy', function (req, res) {
    const proid = req.body.proid;
    const count = req.body.count;
    const query = `select * from product where proid= ${proid}`
    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows[0].quantity >= count) {
            itemcount(req, res);
        } else {
            res.send('수량이 없습니다.')
        }
    })
})


// username을 이용하여 user 테이블 정보 변경
app.put("/usernick/:name", function (req, res) {
    const usernick = req.body.usernick;

    const updatename = req.params.name;
    const query = `UPDATE user SET usernick='${usernick}' WHERE username = '${updatename}'`
    connection.query(query, (err, rows) => {
        if (err) throw err;
        return console.log("update success");
    });
    res.json("good");
})

// username을 이용하여 user password 정보변경
app.put("/userpassword/:name", function (req, res) {
    const userpw = req.body.userpassword;

    const updatename = req.params.name;
    const query = `UPDATE user SET userpw=${userpw} WHERE username = '${updatename}'`
    connection.query(query, (err, rows) => {
        if (err) throw err;
        return console.log("update success");
    });
    res.json("good");
})

// 검색어를 이용하여 검색.
// app.get("/search/:cont", function (req, res) {
//     const searchcont = req.params.cont;
//     const query = `select * from `
// })


app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});
