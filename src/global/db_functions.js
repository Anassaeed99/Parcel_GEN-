import {openDatabase} from 'react-native-sqlite-storage';
import CryptoJS from 'react-native-crypto-js';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'parcel_genie_db.db', createFromLocation: 1});
let db_functions = {
  //detils screen
  async getData_TrackingNumbers(tNumber) {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        [
          'SELECT TrackingNumber FROM PackageInfoList_tbl WHERE MasterTrackingNumber = ?',
        ],
        [tNumber],
        (tx, results) => {
          console.log(`getData_TrackingNumbers ${JSON.stringify(results)}`)
          var temp = [];
          for (let i = 0; i < results.rows.length; i++)
            temp.push(results.rows.item(i));
          resolve(temp);
        },
        err => {
          console.log(`open database error${err}`);
        },
      ),
    );
    return data;
  },

  //details screen
  async getData_DetailData(tNumber) {
    console.log("*****************")
    console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
    console.log("getData_DetailData")
    const tx = await new Promise(resolve => db.transaction(resolve));
    console.log(`tx ${tx}`)
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        [
          'SELECT PackageinfoMasterInfo_tbl.Caption,PackageActivityInfoMaster_tbl.TrackingNumber,Carrier,TimeInTransitInfoList_Tbl.DeliveryDate, PackageActivityInfoMaster_tbl.StatusCode As LastStatusCode,PackageActivityInfoMaster_tbl.StatusDescription As LastStatusDescription,PackageActivityInfoMaster_tbl.SignedForByName ,PackageInfoList_tbl.DeliveryDate as DlDate, PackageActivityInfoList_tbl.ActivityDate,PackageActivityInfoMaster_tbl.ActivityDate LastActivityDate, PackageActivityInfoList_tbl.City,PackageActivityInfoList_tbl.StateProvinceCode,PackageActivityInfoList_tbl.PostalCode,PackageActivityInfoList_tbl.CountryCode, PackageActivityInfoList_tbl.StatusDescription,PackageActivityInfoList_tbl.Latitude,PackageActivityInfoList_tbl.Longitude FROM PackageinfoMasterInfo_tbl Inner Join PackageInfoList_tbl On PackageinfoMasterInfo_tbl.MasterTrackingNumber = PackageInfoList_tbl.MasterTrackingNumber Inner Join PackageActivityInfoMaster_tbl On PackageinfoList_tbl.TrackingNumber =  PackageActivityInfoMaster_tbl.TrackingNumber INNER JOIN PackageActivityInfoList_tbl On PackageinfoList_tbl.TrackingNumber = PackageActivityInfoList_tbl.TrackingNumber Left Outer Join TimeInTransitInfoList_Tbl on PackageinfoMasterInfo_tbl.MasterTrackingNumber =TimeInTransitInfoList_Tbl.TrackingNumber WHERE PackageInfoList_tbl.TrackingNumber = ? ',
        ],
        [tNumber],
        (tx, results) => {
          console.log(`getData_DetailData ${JSON.stringify(results)}`)
          var temp = [];
          for (let i = 0; i < results.rows.length; i++)
            temp.push(results.rows.item(i));
          resolve(temp);
        },
        err => {
          console.log(`getData_DetailData error${err}`);
        },
      ),
    );
    console.log(`data ${data}`)
    console.log("**************")
    return data;
  },

  //dashboard screen
  async getData_DashboardData() {
    console.log(".....................")
    console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
    console.log("getData_DashboardData")
    const tx = await new Promise(resolve => db.transaction(resolve));
    console.log(`tx ${tx}`)
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        [
          'SELECT PackageinfoMasterInfo_tbl.RowID As Seq, PackageinfoMasterInfo_tbl.Caption,PackageinfoMasterInfo_tbl.IDIdentifier,PackageinfoMasterInfo_tbl.MasterTrackingNumber,Carrier,(Select EstimatedDelivery FROM PackageInfoList_tbl WHERE TrackingNumber =  PackageinfoMasterInfo_tbl.MasterTrackingNumber) EstimatedDelivery,PackageActivityInfoMaster_tbl.StatusCode,PackageActivityInfoMaster_tbl.StatusType,PackageActivityInfoMaster_tbl.StatusDescription,PackageActivityInfoMaster_tbl.SignedForByName ,Count(*) As Pkgs FROM PackageinfoMasterInfo_tbl  Inner Join PackageInfoList_tbl On PackageinfoMasterInfo_tbl.MasterTrackingNumber = PackageInfoList_tbl.MasterTrackingNumber INNER JOIN PackageActivityInfoMaster_tbl On PackageinfoMasterInfo_tbl.MasterTrackingNumber = PackageActivityInfoMaster_tbl.TrackingNumber GROUP BY PackageinfoMasterInfo_tbl.Caption,PackageinfoMasterInfo_tbl.MasterTrackingNumber, Carrier, PackageActivityInfoMaster_tbl.StatusCode, PackageActivityInfoMaster_tbl.StatusDescription,PackageActivityInfoMaster_tbl.SignedForByName Order By Seq DESC',
        ],
        [],
        (tx, results) => {
          console.log(`ggetData_DashboardDat ${JSON.stringify(results)}`)
          var temp = [];
          for (let i = 0; i < results.rows.length; i++)
            temp.push(results.rows.item(i));
          resolve(temp);
        },
        err => {
          console.log(`getData_DashboardData error${err}`);
        },
      ),
    );
    console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
    console.log(`data ${data}`)
    console.log(".....................")
    return data;
  },

  //dashbaord screen  
  async insertData_TimeinTransitInfoList(Package_Data) {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        'INSERT INTO TimeinTransitInfoList_tbl (TrackingNumber,ServiceCode,DeliveryDate,BusinessTransitDays,HolidaysCount,RestDays,TotalTransitDays,tntResponse) VALUES (?,?,?,?,?,?,?,?)',
        [
          Package_Data.TrackingNumber,
          Package_Data.ServiceCode,
          Package_Data.DeliveryDate,
          Package_Data.BusinessTransitDays,
          Package_Data.HolidaysCount,
          Package_Data.RestDays,
          Package_Data.TotalTransitDays,
          Package_Data.tntResponse,
        ],
        (tx, results) => {
          console.log(`insertData_TimeinTransitInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function (insertData_TimeinTransitInfoList) >>>>>>>>>>>>>>")
          console.log("******************")
          console.log("Package_Data")
          console.log(Package_Data)
          console.log("******************")
          console.log(`Package_Data.TrackingNumber ${Package_Data.TrackingNumber}`)
          console.log(`Package_Data.ServiceCode ${Package_Data.ServiceCode}`)
          console.log(`Package_Data.DeliveryDate ${Package_Data.DeliveryDate}`)
          console.log(`Package_Data.BusinessTransitDays ${Package_Data.BusinessTransitDays}`)
          console.log(`Package_Data.HolidaysCount ${Package_Data.HolidaysCount}`)
          console.log(`Package_Data.RestDays ${Package_Data.RestDays}`)
          console.log(`Package_Data.TotalTransitDays ${Package_Data.TotalTransitDays}`)
          console.log(`Package_Data.tntResponse ${Package_Data.tntResponse}`)
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
        err => {
          console.log(`inserData_TimeRransitInfoList error${err}`);
        },
      ),
    );
    return data;
  },

  //dashboard screen
  async insertData_PackageInfoMasterInfo(Package_Data) {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        'INSERT INTO PackageinfoMasterInfo_tbl (MasterTrackingNumber,Caption,IDIdentifier) VALUES (?,?,?)',
        [
          Package_Data.MasterTrackingNumber,
          Package_Data.Caption,
          Package_Data.IDIdentifier,
        ],
        (tx, results) => {
          console.log(`insertData_PackageInfoMasterInfo ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function (insertData_PackageInfoMasterInfo) >>>>>>>>>>>>>>")
          console.log("******************")
          console.log("Package_Data")
          console.log(Package_Data)
          console.log("******************")
          console.log(Package_Data.MasterTrackingNumber)
          console.log(Package_Data.Caption)
          console.log(Package_Data.IDIdentifier)
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
        err => {
          console.log(`insertData_PackageInfoMasterInfo error${err}`);
        },
      ),
    );
    return data;
  },

  async insertData_PackageInfoList(Package_Data) {
    this.insertData_PackageActivityInfoMaster(
      Package_Data.PackageActivityInfoMaster,
    );
    for (let i = 0; i < Package_Data.PackageActivityInfoList?.length; i++) {
      this.insertData_PackageActivityInfoList(
        Package_Data.PackageActivityInfoList[i],
      );
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO PackageInfoList_tbl ( DeviceID,MasterTrackingNumber,TrackingNumber,PackageUOM,PackageWeight,Piece,TrackedDate,ShipmentUOM,ShipmentWeight,ShipperNumber,PickupDate,ShipperAddressLine1,ShipperAddressLine2,ShipperAddressLine3,ShipperCity,ShipperProvinceCode,ShipperPostalCode,ShipperCountryCode,ShiptoAddressLine1,ShiptoAddressLine2,ShiptoAddressLine3,ShiptoCity,ShiptoProvinceCode,ShiptoPostalCode,ShiptoCountryCode,ServiceCode,ServiceDescription,GuaranteedDate,DeliveryDate,Carrier,FedexServiceCode,EstimatedDelivery) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          Package_Data.DeviceID,
          Package_Data.MasterTrackingNumber,
          Package_Data.TrackingNumber,
          Package_Data.PackageUOM,
          Package_Data.PackageWeight,
          Package_Data.Piece,
          Package_Data.TrackedDate,
          Package_Data.ShipmentUOM,
          Package_Data.ShipmentWeight,
          Package_Data.ShipperNumber,
          Package_Data.PickupDate,
          Package_Data.ShipperAddressLine1,
          Package_Data.ShipperAddressLine2,
          Package_Data.ShipperAddressLine3,
          Package_Data.ShipperCity,
          Package_Data.ShipperProvinceCode,
          Package_Data.ShipperPostalCode,
          Package_Data.ShipperCountryCode,
          Package_Data.ShiptoAddressLine1,
          Package_Data.ShiptoAddressLine2,
          Package_Data.ShiptoAddressLine3,
          Package_Data.ShiptoCity,
          Package_Data.ShiptoProvinceCode,
          Package_Data.ShiptoPostalCode,
          Package_Data.ShiptoCountryCode,
          Package_Data.ServiceCode,
          Package_Data.ServiceDescription,
          Package_Data.GuaranteedDate,
          Package_Data.DeliveryDate,
          Package_Data.Carrier,
          Package_Data.FedexServiceCode,
          Package_Data.EstimatedDelivery,
        ],
        (tx, results) => {
          console.log(`insertData_PackageInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function (insertData_PackageInfoList)>>>>>>>>>>>>>>")
          console.log("******************")
          console.log("Package_Data")
          console.log(Package_Data)
          console.log("******************")
          console.log(`Package_Data.DeviceID ${Package_Data.DeviceID}`)
          console.log(`Package_Data.MasterTrackingNumber ${Package_Data.MasterTrackingNumber}`)
          console.log(`Package_Data.TrackingNumber ${Package_Data.TrackingNumber}`)
          console.log(`Package_Data.PackageUOM ${Package_Data.PackageUOM}`)
          console.log(`Package_Data.PackageWeight ${Package_Data.PackageWeight}`)
          console.log(`Package_Data.Piece ${Package_Data.PackageWeight}`)
          console.log(`Package_Data.TrackedDate ${Package_Data.PackageWeight}`)
          console.log(`Package_Data.ShipmentUOM ${Package_Data.ShipmentUOM}`)
          console.log(`Package_Data.ShipmentWeight ${Package_Data.ShipmentWeight}`)
          console.log(`Package_Data.ShipperNumber ${Package_Data.ShipperNumber}`)
          console.log(`Package_Data.PickupDate ${Package_Data.PickupDate}`)
          console.log(`Package_Data.ShipperAddressLine1 ${Package_Data.ShipperAddressLine1}`)
          console.log(`Package_Data.ShipperAddressLine2 ${Package_Data.ShipperAddressLine2}`)
          console.log(`Package_Data.ShipperAddressLine3 ${Package_Data.ShipperAddressLine3}`)
          console.log(`Package_Data.ShipperCity ${Package_Data.ShipperCity}`)
          console.log(`Package_Data.ShipperProvinceCode ${Package_Data.ShipperProvinceCode}`)
          console.log(`Package_Data.ShipperPostalCode ${Package_Data.ShipperPostalCode}`)
          console.log(`Package_Data.ShipperCountryCode ${Package_Data.ShipperCountryCode}`)
          console.log(`Package_Data.ShiptoAddressLine1 ${Package_Data.ShiptoAddressLine1}`)
          console.log(`Package_Data.ShiptoAddressLine2 ${Package_Data.ShiptoAddressLine2}`)
          console.log(`Package_Data.ShiptoAddressLine3 ${Package_Data.ShiptoAddressLine3}`)
          console.log(`Package_Data.ShiptoCity ${Package_Data.ShiptoCity}`)
          console.log(`Package_Data.ShiptoProvinceCode ${Package_Data.ShiptoProvinceCode}`)
          console.log(`Package_Data.ShiptoPostalCode ${Package_Data.ShiptoPostalCode}`)
          console.log(`Package_Data.ShiptoCountryCode ${Package_Data.ShiptoCountryCode}`)
          console.log(`Package_Data.ServiceCode ${Package_Data.ServiceCode}`)
          console.log(`Package_Data.ServiceDescription ${Package_Data.ServiceDescription}`)
          console.log(`Package_Data.GuaranteedDate ${Package_Data.GuaranteedDate}`)
          console.log(`Package_Data.DeliveryDate ${Package_Data.DeliveryDate}`)
          console.log(`Package_Data.Carrier ${Package_Data.Carrier}`)
          console.log(`Package_Data.FedexServiceCode ${Package_Data.FedexServiceCode}`)
          console.log(`Package_Data.EstimatedDelivery ${Package_Data.EstimatedDelivery}`)
          
          console.log('Results', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
        err => {
          console.log(`insertData_PackageInfoList error${err}`);
        },
      );
    });
  },

  async insertData_PackageActivityInfoMaster(Package_Data) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO PackageActivityInfoMaster_tbl (TrackingNumber,AddressLine1,AddressLine2,AddressLine3,City,StateProvinceCode,PostalCode,CountryCode,LocationCode,LocationDescription,SignedForByName,StatusType,StatusCode,StatusDescription,ActivityDate,ActivitySeq,IsNotified,DeviceID,Latitude,Longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          Package_Data.TrackingNumber,
          Package_Data.AddressLine1,
          Package_Data.AddressLine2,
          Package_Data.AddressLine3,
          Package_Data.City,
          Package_Data.StateProvinceCode,
          Package_Data.PostalCode,
          Package_Data.CountryCode,
          Package_Data.LocationCode,
          Package_Data.LocationDescription,
          Package_Data.SignedForByName,
          Package_Data.StatusType,
          Package_Data.StatusCode,
          Package_Data.StatusDescription,
          Package_Data.ActivityDate,
          Package_Data.ActivitySeq,
          Package_Data.IsNotified,
          Package_Data.DeviceID,
          Package_Data.Latitude,
          Package_Data.Longitude,
        ],
        (tx, results) => {
          console.log(`insertData_PackageActivityInfoMaster ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function (insertData_PackageActivityInfoMaster)>>>>>>>>>>>>>>")
          console.log("******************")
          console.log("Package_Data")
          console.log(Package_Data)
          console.log("******************")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
        err => {
          console.log(`insertData_PackageActivityInfoMaster error${err}`);
        },
      );
    });
  },

  async insertData_PackageActivityInfoList(Package_Data) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO PackageActivityInfoList_tbl (TrackingNumber,AddressLine1,AddressLine2,AddressLine3,City,StateProvinceCode,PostalCode,CountryCode,LocationCode,LocationDescription,SignedForByName,StatusType,StatusCode,StatusDescription,ActivityDate,ActivitySeq,IsNotified,DeviceID,Latitude,Longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          Package_Data.TrackingNumber,
          Package_Data.AddressLine1,
          Package_Data.AddressLine2,
          Package_Data.AddressLine3,
          Package_Data.City,
          Package_Data.StateProvinceCode,
          Package_Data.PostalCode,
          Package_Data.CountryCode,
          Package_Data.LocationCode,
          Package_Data.LocationDescription,
          Package_Data.SignedForByName,
          Package_Data.StatusType,
          Package_Data.StatusCode,
          Package_Data.StatusDescription,
          Package_Data.ActivityDate,
          Package_Data.ActivitySeq,
          Package_Data.IsNotified,
          Package_Data.DeviceID,
          Package_Data.Latitude,
          Package_Data.Longitude,
        ],
        (tx, results) => {
          console.log(`insertData_PackageActivityInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function (insertData_PackageActivityInfoList)>>>>>>>>>>>>>>")
          console.log("******************")
          console.log("Package_Data")
          console.log(Package_Data)
          console.log("******************")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
        err => {
          console.log(`insertData_PackageActivityInfoList error${err}`);
        },
      );
    });
  },

  async insertData_AddressBook(
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
    d11,
    d12,
    d13,
    d14,
  ) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO AddressBook_tbl (addressType,addressID,addressCompany,contactName,address1,address2,addressZip,addressCity,addressState,addressPhoneNo,addressVarifiedFlag,CountryName,countryCode,addressStateCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14],
        (tx, results) => {
          console.log(`insertData_AddressBook ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
          } else alert('Registration Failed');
        },
      );
    });
  },

  async getData_AddressBook() {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        ['SELECT * FROM AddressBook_tbl'],
        [],
        (tx, results) => {
          console.log(`getData_AddressBook ${JSON.stringify(results)}`)
          var temp = [];
          for (let i = 0; i < results.rows.length; i++)
            temp.push(results.rows.item(i));
          resolve(temp);
        },
      ),
    );
    return data;
  },

  async delete_TimeinTransitInfoList(Tnumber) {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM TimeinTransitInfoList_tbl WHERE TrackingNumber in ( SELECT TrackingNumber from PackageInfoList_tbl where MasterTrackingNumber = ?)',
        [Tnumber],
        (tx, results) => {
          console.log(`delete_TimeinTransitInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'User5 deleted successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Delete_PackageInfoMasterInfo(Tnumber) {
    db.transaction(tx => {
      tx.executeSql(
        'Delete From PackageinfoMasterInfo_tbl where MasterTrackingNumber = ?',
        [Tnumber],
        (tx, results) => {
          console.log(`Delete_PackageInfoMasterInfo ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'User4 deleted successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Delete_PackageActivityInfoMaster(Tnumber) {
    db.transaction(tx => {
      tx.executeSql(
        'Delete From PackageActivityInfoMaster_tbl where TrackingNumber in ( SELECT TrackingNumber from PackageInfoList_tbl where MasterTrackingNumber = ?)',
        [Tnumber],
        (tx, results) => {
          console.log(` Delete_PackageActivityInfoMaster ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'User3 deleted successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Delete_PackageActivityInfoList(Tnumber) {
    db.transaction(tx => {
      tx.executeSql(
        'Delete From PackageActivityInfoList_tbl where TrackingNumber in ( SELECT TrackingNumber from PackageInfoList_tbl where MasterTrackingNumber = ?)',
        [Tnumber],
        (tx, results) => {
          console.log(` Delete_PackageActivityInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'User2 deleted successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Delete_PackageInfoList(Tnumber) {
    db.transaction(tx => {
      tx.executeSql(
        'Delete From PackageInfoList_tbl where MasterTrackingNumber = ?',
        [Tnumber],
        (tx, results) => {
          console.log(`Delete_PackageInfoList ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'User1 deleted successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Delete_Address(id) {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        ['Delete From AddressBook_tbl where ID = ?'],
        [id],
        (tx, results) => {
          console.log(`Delete_Address ${JSON.stringify(results)}`)
          resolve(results);
        },
      ),
    );
    return data;
  },

  async Update_Caption(tNumber, Caption) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE PackageinfoMasterInfo_tbl SET Caption = ? WHERE MasterTrackingNumber=?',
        [Caption, tNumber],
        (tx, results) => {
          console.log(`Update_Caption ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'Update successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Update_Address(
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
    d11,
    d12,
    d13,
    d14,
    id,
  ) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE AddressBook_tbl SET addressType = ?,addressID = ?,addressCompany = ?,contactName = ?,address1 = ?,address2 = ?,addressZip = ?,addressCity = ?,addressState = ?,addressPhoneNo = ?,addressVarifiedFlag = ? ,CountryName = ?,countryCode = ?, addressStateCode = ? where ID = ?',
        [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, id],
        (tx, results) => {
          console.log(`Update_Address ${JSON.stringify(results)}`)
          console.log("<<<<<<<<<<<<<<<< Db Function >>>>>>>>>>>>>>")
          console.log('Results1', results);
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'Update successfully');
          } else console.log('Registration Failed');
        },
      );
    });
  },

  async Search_TrackingNumber(tNumber) {
    const tx = await new Promise(resolve => db.transaction(resolve));
    const data = await new Promise((resolve, reject) =>
      tx.executeSql(
        [
          'SELECT COUNT(TrackingNumber) AS count  FROM PackageInfoList_tbl WHERE TrackingNumber=?',
        ],
        [tNumber],
        (tx, results) => {
          console.log(`Search_TrackingNumber ${JSON.stringify(results)}`)
          var temp = [];
          for (let i = 0; i < results.rows.length; i++)
            temp.push(results.rows.item(i));
          resolve(temp);
        },
      ),
    );
    return data;
  },
};

export default db_functions;
