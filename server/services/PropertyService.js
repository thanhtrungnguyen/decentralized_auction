const PropertyDAO = require('../dal/PropertyDAO')

const createPropertyService = async(token,files,startViewPropertyTime,endViewPropertyTime,category,property) =>{
    try {
        const token = req.cookies.access_token;
    var category,
        propertyId,
        userId = null;
    var property;

    var files = req.files;
    const result = await uploadFile(files.propertyImage0[0]);
    console.log(result);
    const result1 = await uploadFile(files.propertyImage1[0]);
    console.log(result1);
    const result2 = await uploadFile(files.propertyImage2[0]);
    console.log(result2);

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        userId = user.id;
    });

    var startViewPropertyTime = new Date(req.body.viewPropertyTime.split(",")[0]).toISOString();
    var endViewPropertyTime = new Date(req.body.viewPropertyTime.split(",")[1]).toISOString();

    try {
        // find category
        await conn.query(`Select Id, Name from Category_DAP__c where Name = '${req.body.category}'`, (err, result) => {
            if (err) return console.error(err);
            category = result.records[0].Id;
        });

        await conn.sobject("Property_DAP__c").create(
            {
                Name: req.body.propertyName,
                Category_Id__c: category,
                Description__c: req.body.propertyDescription,
                Deposit_Amount__c: req.body.deposit,
                Start_View_Property_Time__c: startViewPropertyTime,
                End_View_Property_Time__c: endViewPropertyTime,
                Place_View_Property__c: req.body.placeViewProperty,
                Price_Step__c: req.body.priceStep,
                Start_Bid__c: req.body.startBid,
                //User_Id__c: req.body.userId
                User_Id__c: userId,
            },
            (err, result) => {
                if (err) console.error(err);
                property = result.id;
            }
        );
        await conn.sobject("Property_DAP__c").findOne(
            {
                Id: property,
            },
            (err, result) => {
                if (err) console.error(err);
                propertyId = result.Id;
            }
        );
        var mediaUrl = [
            { Name: result.key, Property_DAP_Id__c: propertyId },
            { Name: result1.key, Property_DAP_Id__c: propertyId },
            { Name: result2.key, Property_DAP_Id__c: propertyId },
            { Name: req.body.propertyVideo, Property_DAP_Id__c: propertyId },
        ];

        await conn.bulk.load("Property_Media__c", "insert", mediaUrl, function (err, rets) {
            if (err) {
                return console.error(err);
            }
            for (var i = 0; i < rets.length; i++) {
                if (rets[i].success) {
                    console.log("#" + (i + 1) + " loaded successfully, id = " + rets[i].id);
                } else {
                    console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors.join(", "));
                }
            }
            // ...
        });
        // await conn.sobject("Property_Media__c").insertBulk(mediaUrl, (err, result) => {
        //     if (err) console.error(err)
        //     result.map(item => {
        //         console.log(item)
        //     })
        // })
        res.status(200).send("Property has been created.");
    } catch (error) {
        next(error);
    }
    } catch (error) {
        console.error(error)
    }
}