const doctorData = [
  {
    id: "01",
    image: "../assets/doc-male-new.png",
    docName: "Dr Jaganmani Sreekanth",
    year: "25 years",
    category:"Internal Medicine",
    degree: "MBBS; Diploma (Ophthalmology); MD (Internal Medicine)",
    language: "English,Hindi",
    description:
      "Dr Jaganmani Sreekanth is an experienced Interventional based in Hyderabad. Dr Jaganmani Sreekanth graduated from MBBS",
      appntTime:"(12:00 - 13:15)",
      gender :"male"
  },

  {
    id: "02",
    image: "../assets/doc-female-new.png",
    docName: "Dr Kalpana Janardan",
    year: "20 years",
    category:"Internal Medicine",
    degree: "MBBS,MD(American Board Certified in Gen Medicine",
    language: "English,Hindi",
    description:
      "Dr Kalpana Janardan is an experienced Interventional Internal Medicine based in Bangalore. Dr Kalpana Janardan graduated from MBBS,MD(American Board Certified in Gen ",
      appntTime:"(11:00 - 15:00)",
      gender :"female"
  },
  
  {
    id: "03",
    image: "../assets/doc-male-new.png",
    docName: "Dr S N Pathak",
    year: "17 years",
    category:"Cardiologist",
    degree: "MBBS, MD(Medicine), DM (Cardiology)",
    language: "English,Hindi",
    description:
      "Dr S N Pathak is an experienced Interventional based in Delhi. Dr S N Pathak graduated from MBBS, MD(Medicine), DM (Cardiology)",
      appntTime:"(10:00 - 15:00)",
      gender :"male"

  },

  {
    id: "04",
    image: "../assets/doc-female-new.png",
    docName: "Dr Sarota Rao",
    year: "21 years",
    category:"Cardiologist",
    degree: "MBBS; DM Cardiology",
    language: "English,Hindi",
    description:
      "Dr Sarita Rao is an experienced Interventional Cardiologist based in Indore. Dr Sarita Rao graduated from MBBS; DM Cardiology ",
      appntTime:"(10:00 - 15:00)",
      gender :"female"

  },
  
  {
    id: "05",
    image: "../assets/doc-male-new.png",
    docName: "Dr Avinash Gupta",
    year: "11 years",
    category:"Neurologist",
    degree: "MBBS,DNB(MED),DNB(NEUROLOGY)",
    language: "English,Hindi",
    description:
      "Dr Avinash Gupta is an experienced Interventional based in Bilaspur. Dr Avinash Gupta graduated from MBBS,DNB(MED),DNB(NEUROLOGY)",
      appntTime:"(10:00 - 16:00)",
      gender :"male"

  },

  {
    id: "06",
    image: "../assets/doc-female-new.png",
    docName: "Dr Rashmi Devaraj",
    year: "12 years",
    category:"Neurologist",
    degree: "MBBS,DNB(MED),DNB(NEUROLOGY)",
    language: "English,Hindi",
    description:
      "Dr Rashmi Devaraj is an experienced Interventional based in Bilaspur. Dr Avinash Gupta graduated from MBBS,DNB(MED),DNB(NEUROLOGY)",
      appntTime:"(09:00 - 20:00)",
      gender :"female"

  },

  {
    id: "07",
    image: "../assets/doc-male-new.png",
    docName: "Dr Amit Gharat",
    year: "13 years",
    category:"Gastroenterologist",
    degree: "MBBS, MD, DNB",
    language: "English,Hindi",
    description:
      "Dr Amit Gharat is an experienced Interventional based in Mumbai. Dr Amit Gharat graduated from MBBS, MD, DNB",
      appntTime:"(13:30 - 16:30)",
      gender :"male"

  },
  {
    id: "08",
    image: "../assets/doc-female-new.png",
    docName: "Dr P Hima Bindhu",
    year: "5 years",
    category:"Gastroenterologist",
    degree: "MBBS, MD, DNB",
    language: "English,Hindi",
    description:
      "Dr P Hima Bindhu is an experienced Interventional based in Mumbai. Dr Amit Gharat graduated from MBBS, MD, DNB",
      appntTime:"(09:00 - 17:00)",
      gender :"female"

  },

  {
    id: "09",
    image: "../assets/doc-male-new.png",
    docName: "Dr S R K Dikshith",
    year: "12 years ",
    category:"Orthopedician",
    degree: "MS .Ortho ( gold medalist) , DNB . Ortho, FIJR Fellow in Advanced Arthroscopy",
    language: "English,Hindi",
    description:
      "Dr S R K Dikshith is an experienced Interventional based in Hyderabad. Dr S R K Dikshith graduated from MS .Ortho ( gold medalist) , DNB . Ortho, FIJR Fellow in Advanced Arthroscopy",
      appntTime:"(10:30 - 15:30)",
      gender :"male"

  },
  {
    id: "10",
    image: "../assets/doc-female-new.png",
    docName: "Dr S Madhuri",
    year: "8 years",
    category:"Dermatologist",
    degree: "MBBS, MD DVL, DNB DVL, FELLOW IN DERMATOSURGERY AND LASERS",
    language: "English,Hindi",
    description:
      "Dr S Madhuri is an experienced Interventional based in Hyderabad. Dr S Madhuri graduated from MBBS, MD DVL, DNB DVL, FELLOW IN DERMATOSURGERY AND LASERS",
      appntTime:"(14:00 - 16:00)",
      gender :"female"

  },
  {
    id: "11",
    image: "../assets/doc-female-new.png",
    docName: "Dr Pragati Jain",
    year: "8 years",
    category:"Dermatologist",
    degree: "MBBS, MD DVL, DNB DVL, FELLOW IN DERMATOSURGERY AND LASERS",
    language: "English,Hindi",
    description:
      "Dr Pragati Jain is an experienced Interventional based in Hyderabad. Dr S Madhuri graduated from MBBS, MD DVL, DNB DVL, FELLOW IN DERMATOSURGERY AND LASERS",
      appntTime:"(10:00 - 16:00)",
      gender :"female"

  },

  {
    id: "12",
    image: "../assets/doc-male-new.png",
    docName: "Dr Rajib Paul",
    year: "20 years",
    category:"Plastic Surgeon",
    degree: "MBBS; MD (General Medicine)",
    language: "English,Hindi",
    description:
      "Dr Rajib Paul is an experienced Interventional based in Hyderabad. Dr Rajib Paul graduated from MBBS; MD (General Medicine)",
      appntTime:"(12:30 - 14:15)",
      gender :"male"

  },
  {
    id: "13",
    image: "../assets/doc-female-new.png",
    docName: "Dr Pramati Reddy",
    year: "17 years",
    category:"Plastic Surgeon",
    degree: "MBBS; MD (General Medicine)",
    language: "English,Hindi",
    description:
      "Dr Pramati Reddy is an experienced Interventional based in Hyderabad. Dr Rajib Paul graduated from MBBS; MD (General Medicine)",
      appntTime:"(10:00 - 12:15)",
      gender :"female"

  },

  {
    id: "14",
    image: "../assets/doc-female-new.png",
    docName: "Dr Sripriya Sanker",
    year: "26 years",
    category:"Opthalmologist",
    degree: "MBBS, Diploma in Ophthalmology (DO), FRCS (Glasg)",
    language: "English,Hindi",
    description:
      "Dr Sripriya Sankar is an experienced Interventional based in Chennai. Dr Sripriya Sankar graduated from MBBS, Diploma in Ophthalmology (DO), FRCS (Glasg)",
      appntTime:"(11:00 - 12:00)",
      gender :"female"

  },
  {
    id: "15",
    image: "../assets/doc-male-new.png",
    docName: "Dr Siddharth Shukla",
    year: "10 years",
    category:"Opthalmologist",
    degree: "MBBS, Diploma in Ophthalmology (DO), FRCS (Glasg)",
    language: "English,Hindi",
    description:
      "Dr Siddharth Shukla is an experienced Interventional based in Chennai. Dr Sripriya Sankar graduated from MBBS, Diploma in Ophthalmology (DO), FRCS (Glasg)",
      appntTime:"(09:00 - 17:30)",
      gender :"male"

  },

  {
    id: "16",
    image: "../assets/doc-female-new.png",
    docName: "Dr Rashmi Sudhir",
    year: "15 years",
    category:"Radiologist",
    degree: "MBBS(CMC,Vellore), DNB (Radiology)",
    language: "English,Hindi",
    description:
      "Dr Rashmi Sudhir is an experienced Interventional based in Hyderabad. Dr Rashmi Sudhir graduated from MBBS(CMC,Vellore)",
      appntTime:"(10:00 - 16:00)",
      gender :"female"

  },
  {
    id: "17",
    image: "../assets/doc-male-new.png",
    docName: "Dr Savith Kumar",
    year: "11 years",
    category:"Radiologist",
    degree: "MBBS(CMC,Vellore), DNB (Radiology)",
    language: "English,Hindi",
    description:
      "Dr Savith Kumar is an experienced Interventional based in Hyderabad. Dr Rashmi Sudhir graduated from MBBS(CMC,Vellore)",
      appntTime:"(08:00 - 17:00)",
      gender :"male"

  },

  {
    id: "18",
    image: "../assets/doc-male-new.png",
    docName: "Dr Jaisom Chopra",
    year: "35 years",
    category:"Vascular Surgeon",
    degree: "BSc, MBBS, MS, FRCS(Edin)",
    language: "English,Hindi",
    description:
      "Dr Jaisom Chopra is an experienced Interventional based in Delhi. Dr Jaisom Chopra graduated from BSc, MBBS, MS, FRCS(Edin)",
      appntTime:"(10:00 - 17:00)",
      gender :"male"

  },
  {
    id: "19",
    image: "../assets/doc-female-new.png",
    docName: "Dr Nikhila Pinjala",
    year: "07 years",
    category:"Vascular Surgeon",
    degree: "BSc, MBBS, MS, FRCS(Edin)",
    language: "English,Hindi",
    description:
      "Dr Nikhila Pinjala is an experienced Interventional based in Delhi. Dr Jaisom Chopra graduated from BSc, MBBS, MS, FRCS(Edin)",
      appntTime:"(09:00 - 16:00)",
      gender :"female"

  },

];
