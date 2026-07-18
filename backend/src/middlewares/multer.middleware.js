import multer from 'multer';

const storage = multer.diskStorage({
  // this multer func is rsponsible for storing files on my server folder public/temp
  // It takes file cd in cb we give hime one destination where files are stored and second cb where we pass the file name
  destination: (req, file, cb) => {
    cb(null, '/public/temp');
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage });
