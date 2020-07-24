const cheerio = require('cheerio');
const xlsx = require('xlsx');
const fs = require('fs');
const request = require('request');


const url ="https://en.wikipedia.org/wiki/List_of_districts_of_Gujarat";

request(url,function (err, res, body) {
	if (err) {
		console.log(err)
	}else{

		let finalArray =[];
		let $ = cheerio.load(body);

		$('.wikitable tr').toArray().forEach(value =>{

			var firstrow = [];
			finalArray.push(firstrow)

 			//Header 
 			 var No =($(value).find('th').eq(0).text())
 			 var District =($(value).find('th').eq(1).text())
 			 var DistrictHeadquarters =($(value).find('th').eq(2).text())
 			var Population2001_Census =($(value).find('th').eq(3).text())
 			var Population2011_Census =($(value).find('th').eq(4).text())
 			var Area_Km =($(value).find('th').eq(5).text())
 			var Density_km =($(value).find('th').eq(6).text())
 			var Year_of_Formation =($(value).find('th').eq(7).text())
 			var Taluka_Tehsil =($(value).find('th').eq(8).text())
 			var Total_Talukas =($(value).find('th').eq(9).text())
 			
 			if (No == '') {

 			}else{
 				//Push Header to Blank Array firstrow
 				 firstrow.push(No)
 				 firstrow.push(District)
 				 firstrow.push(DistrictHeadquarters)
 				firstrow.push(Population2001_Census)
 				firstrow.push(Population2011_Census)
 				firstrow.push(Area_Km)
 				firstrow.push(Density_km)
 				firstrow.push(Year_of_Formation)
 				firstrow.push(Taluka_Tehsil)
 				firstrow.push(Total_Talukas)
 		}

 			//Information Like Wise Column
 		 	const No_Value = ($(value).find('td').eq(0).text());
 		  	const District_Name = ($(value).find('td').eq(1).text());
 		 	const District_HeadQuater = ($(value).find('td').eq(2).text());
 			const District_Population_2001 = ($(value).find('td').eq(3).text());
 			const District_Population_2011 = ($(value).find('td').eq(4).text());
 			const District_Area_Km = ($(value).find('td').eq(5).text());
			const District_Density_km = ($(value).find('td').eq(6).text());
 			const District_Year_Of_Formation = ($(value).find('td').eq(7).text());
 			const District_Taluka_Tehsil = ($(value).find('td').eq(8).text());
 			const District_Total_Taluka = ($(value).find('td').eq(9).text());

 			//Push Value to Column
 		 firstrow.push(No_Value)
 		 firstrow.push(District_Name)
 		 firstrow.push(District_HeadQuater)
 			firstrow.push(District_Population_2001)
 			firstrow.push(District_Population_2011)
 			firstrow.push(District_Area_Km)
 			firstrow.push(District_Density_km)
 			firstrow.push(District_Year_Of_Formation)
 			firstrow.push(District_Taluka_Tehsil)
 			firstrow.push(District_Total_Taluka)

 		})
		//console.log(finalArray)

		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.aoa_to_sheet(finalArray);
		xlsx.utils.book_append_sheet(wb,ws);
		xlsx.writeFile(wb,'Coutry_information' + Date.now() + '.xlsx')
	}
})