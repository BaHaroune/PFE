const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secret = '3743@hrn'

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));  

app.use(session({
    key: 'user',
    secret: '12521hrn@',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: null
    }
}))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3743hrn',
    database: 'loginsys'
});

app.post("/registreClient", (req, res) => {
    const username = req.body.username;
    const lastname = req.body.lastname;
    const email = req.body.email
    const password = req.body.password;
    const tel = req.body.tel;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        const sqlInsert = "INSERT INTO client (nom, prenom, email, password, tel) VALUES (?, ?, ?, ?, ?)";
        db.query(
            sqlInsert,
            [username, lastname, email, hash, tel],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const token = jwt.sign({ role: "client" }, secret);
                    // Send the JWT back to the client
                    res.send({ token: token, role: 'client' });
                    // console.log(result);
                }
            }

        );
    })
});

app.get('/getClients', (req, res) => {
    const sqlInsert = "SELECT * FROM client";
    db.query(
        sqlInsert,
        (err, result) => {
            if (result.length > 0) {
                // console.log(result);
                res.send(result);
            } else {
                console.log("aucun client pour l'instant");
            }
        }
    );
})

app.post("/registrePrestataires", (req, res) => {
    const username = req.body.username;
    const lastname = req.body.lastname;
    const email = req.body.email
    const password = req.body.password;
    const tel = req.body.password;
    const categorie = req.body.categorie;
    const domaineCompetance = req.body.domaineCompetance;
    const age = req.body.age;
    const pays = req.body.pays;
    const ville = req.body.ville;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        const sqlInsert = "INSERT INTO prestataire (nom, prenom, email, password, tel, categorie, domaineComp, age, pays, ville) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.query(
            sqlInsert,
            [username, lastname, email, hash, tel, categorie, domaineCompetance, age, pays, ville],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const token = jwt.sign({ role: "prestataire" }, secret);
                    // Send the JWT back to the client
                    res.send({ token: token, role: 'prestataire' });
                    // console.log(result);
                }
            }
        );
    })
});

app.get('/getPrestataires', (req, res) => {
    const sqlInsert = "SELECT * FROM prestataire";
    db.query(
        sqlInsert,
        (err, result) => {
            if (result.length > 0) {
                // console.log(result);
                res.send(result);
            } else {
                console.log("aucun prestataire pour l'instant");
            }
        }
    );
})

app.post("/submitService", (req, res) => {

    const titre = req.body.titre;
    const categorie = req.body.categorie;
    const description = req.body.description;
    const prix = req.body.prix;
    const delai = req.body.delai;
    const pays = req.body.pays;
    const ville = req.body.ville;
    const token = req.query.access_token || req.body.access_token;

    // console.log(token)
    try {
        const user = jwt.verify(token, secret);
        const clienId = user.user.client_id;
        console.log(clienId);

        const sqlInsert = "INSERT INTO service (titre, categorie, description, prix, delai, pays, ville, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
            sqlInsert,
            [titre, categorie, description, prix, delai, pays, ville, clienId],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    res.send(result);
                }
            }
        );
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});

app.post("/offreService", (req, res) => {

    const token = req.body.access_token || req.query.access_token;
    const service_id = req.body.service_id || req.query.service_id;
    try {
        const user = jwt.verify(token, secret);
        const prestataireId = user.user.prestataire_id;
        const sqlInsert = "INSERT INTO offre (service_id, prestataire_id) VALUES (?, ?) "
        db.query(
            sqlInsert,
            [service_id, prestataireId],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    res.send(result);
                }
            }
        );
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});



app.get('/profile', (req, res) => {
    const token = req.query.access_token || req.body.access_token;

    // console.log(token)
    try {
        const user = jwt.verify(token, secret);
        console.log(user);
        res.send(user);
    } catch (err) {
        console.error(err);
        return res.status(401).send("Invalid Token");
    }
});

app.get("/PrestataireInfo", (req, res) => {
    try {
        const prestataireId = req.query.prestataireId || req.body.prestataireId;
        const sqlSelect = "SELECT * from prestataire WHERE prestataire_id = ?";
        db.query(
            sqlSelect,
            [prestataireId],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error while fetching prestataire information");
                } else {
                    if(result.length === 0){
                        return res.status(404).send("Prestataire not found");
                    }
                    res.status(200).send(result[0]);
                }
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error while fetching prestataire information");
    }   
});


app.post("/offre", (req, res) => {
    const offreId = req.body.offreId
    const serviceId = req.body.serviceId
    const prestataireId = req.body.prestataireId

    const sqlInsert = "INSERT INTO offre (offre_id, service_id, prestataire_id) VALUES ( ?, ?, ?)";
    db.query(
        sqlInsert,
        [offreId, serviceId, prestataireId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);
                res.send(result);
            }
        }
    );
});

app.get("/offre", (req, res) => {
    const serviceId = req.query.serviceId || req.body.serviceId;
    console.log(serviceId)
    const sqlInsert = `SELECT p.prestataire_id, p.prenom, p.nom FROM prestataire p, service s, offre o WHERE p.prestataire_id = o.prestataire_id AND s.service_id = o.service_id AND s.service_id = ${serviceId}`;
    db.query(
        sqlInsert, 
        (err, result)=> {
            if(err){
                console.log(err);
            } else {
                if(result.length > 0){
                    // console.log(result);
                    res.send(result);
                } else {
                    res.send({message : "aucune offre pour l'instant"})
                }
            }
        }
    )
})

// app.get('/offre', (req, res) => {
//     const sqlInsert = "SELECT * from prestataire p, offre o where p.service_id = o.service_id";
//     db.query(sqlInsert, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (result.length > 0) {
//                 res.send(result);
//             } else {
//                 res.send({ Message: "0 offre pour l'instant" });
//             }
//         }
//     })
// })

app.get('/getServiceCourants', (req, res) => {
    const sqlInsert = "SELECT * FROM loginsys.service s, loginsys.offre o where s.service_id = o.service_id";
    db.query(
        sqlInsert,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length > 0) {
                    // console.log(result);
                    res.send(result);
                } else {
                    console.log("aucun service pour l'instant");
                }
            }
        }
    );
})

app.get('/getServices', (req, res) => {
    const sqlInsert = "SELECT * FROM service";
    db.query(
        sqlInsert,
        (err, result) => {
            if (result.length > 0) {
                // console.log(result);
                res.send(result);
            } else {
                console.log("aucun service pour l'instant");
            }
        }
    );
})

app.get('/getServicesClient', (req, res) => {
    const token = req.query.access_token || req.body.access_token;
    console.log(token);
    try {
        const user = jwt.verify(token, secret);
        const clientId = user.user.client_id;
        console.log(clientId);
        const sqlInsert = "SELECT * FROM service where client_id = ?";
        db.query(
            sqlInsert,
            clientId,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.length > 0) {
                        // console.log(result);
                        res.send(result);
                    } else {
                        console.log("aucun service pour l'instant");
                    }
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
})

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password;

    const sqlInsert = "SELECT * FROM client WHERE email = ?";
    db.query(
        sqlInsert,
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result[0];
                        const token = jwt.sign({ role: 'client', user: result[0] }, secret);
                        res.send({ role: 'client', token: token });
                    } else {
                        res.send({ message: "Wrong password" });
                    }
                })
            } else {
                const sqlInsert = "SELECT * FROM prestataire WHERE email = ?";
                db.query(
                    sqlInsert,
                    email,
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                        }
                        if (result.length > 0) {
                            bcrypt.compare(password, result[0].password, (error, response) => {
                                if (response) {
                                    req.session.user = result[0];
                                    const token = jwt.sign({ role: 'prestataire', user: result[0] }, secret);
                                    res.send({ role: 'prestataire', token: token, user: result[0] });
                                } else {
                                    res.send({ message: "Wrong password" });
                                }
                            })
                        } else {
                            const sqlInsert = "SELECT * FROM admin WHERE nom = ?";
                            db.query(
                                sqlInsert,
                                email,
                                (err, result) => {
                                    if (err) {
                                        res.send({ err: err });
                                    }
                                    if (result.length > 0) {
                                        bcrypt.compare(password, result[0].password, (error, response) => {
                                            if (response) {
                                                req.session.user = result[0];
                                                const token = jwt.sign({ role: 'admin', user: result[0] }, secret);
                                                res.send({ role: 'admin', token: token });
                                            } else {
                                                res.send({ message: "Wrong password" });
                                            }
                                        })
                                    } else {
                                        res.send({ message: "User does not exist" });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});


app.get('/login', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false });
    }
})

app.get('/user', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.send({});
    }
});

app.get('/admin', (req, res) => {
    if (req.session.user) {
        // console.log(req.session.user);
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false });
    }
})

app.put('/updateProfile', (req, res) => {
    const nom = req.query.nom || req.body.nom;
    const prenom = req.query.prenom || req.body.prenom;
    const email = req.query.email || req.body.email;
    const age = req.query.age || req.body.age;
    const tel = req.query.tel || req.body.tel;
    const pays = req.query.pays || req.body.pays;
    const ville = req.query.ville || req.body.ville;
    const categorie = req.query.categorie || req.body.categorie;
    const domaineComp = req.query.domaineComp || req.body.domaineComp;
    const profile_desc = req.query.profile_desc || req.body.profile_desc;

    const sqlUpdate = "UPDATE prestataire SET nom=?, prenom=?, email=?, age=?, tel=?, pays=?, ville=?, categorie=?, domaineComp=?, profile_desc=? WHERE email=?";
    db.query(sqlUpdate, [nom, prenom, email, age, tel, pays, ville, categorie, domaineComp, profile_desc, email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "An error occurred while updating the profile" });
        } else {
            res.send({ message: "Profile updated successfully" });
        }
    });
});


app.listen(3001, () => {
    console.log("running on port 3001...")
});