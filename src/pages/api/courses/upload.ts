import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { IncomingForm } from 'formidable';
import path from 'path';
import mv from 'mv';

export const config = {
  api: {
    bodyParser: false,
  },
};

const maxSize = 1024 * 1024;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return uploadImage(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({});
  }
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      const image = files.image[0];
      // console.log(image);
      if (!image.mimetype || !image.mimetype.startsWith('image')) {
        throw new Error('Please upload an image');
      }
      if (image.size > maxSize) {
        throw new Error('Please upload image smaller than 1MB');
      }
      const oldPath = image.filepath;
      const imageName = image.originalFilename;
      const newPath = path.join(
        __dirname,
        `../../../../../public/${imageName}`
      );
      mv(oldPath, newPath, function (err) {});
      res.status(StatusCodes.OK).json({ image: { src: `/${imageName}` } });
    });
  });
};
export default handler;
