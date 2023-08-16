import { NEXT_URL } from '@/config';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '@/store/atoms/courseAtom';
import { courseSelector } from '@/store/selectors/courseSelector';

const CourseDetail = () => {
  const router = useRouter();
  const selectedCourse = useRecoilValue(courseSelector);
  const setCourseState = useSetRecoilState(courseState);

  const [image, setImage] = useState(
    selectedCourse?.image ? selectedCourse?.image : '/image_upload.svg'
  );
  const [title, setTitle] = useState(
    selectedCourse?.title ? selectedCourse?.title : ''
  );
  const [description, setDescription] = useState(
    selectedCourse?.description ? selectedCourse?.description : ''
  );
  const [price, setPrice] = useState(
    selectedCourse?.price ? selectedCourse?.price : 0.0
  );
  const [isPublished, setIsPublished] = useState(
    selectedCourse?.isPublished ? selectedCourse?.isPublished : false
  );
  const [isLoading, setIsLoading] = useState(false);

  const clearFormValues = () => {
    setTitle('');
    setDescription('');
    setPrice(0.0);
    setImage('/image_upload.svg');
    setIsPublished(false);
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      setIsLoading(true);
      const file = e.target.files[0];
      try {
        const imageData = new FormData();
        imageData.append('image', file);
        const imageUploadResponse = await axios.post(
          `${NEXT_URL}/api/courses/upload`,
          imageData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setImage(imageUploadResponse.data.image.src);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert('Error uploading image.');
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        title,
        description,
        price,
        image,
        isPublished,
      };
      if (!selectedCourse) {
        const response = await axios.post(`${NEXT_URL}/api/courses`, payload);
        clearFormValues();
      } else {
        const response = await axios.put(
          `${NEXT_URL}/api/courses/${selectedCourse._id}`,
          payload
        );
      }
      setIsLoading(false);
      router.push('/courses/created');
    } catch (error) {
      console.error(error);
      alert('Error in adding course.');
      setIsLoading(false);
    }
  };

  return (
    <section className=''>
      <div className='add-course-container'>
        <div className='form upload-image-form'>
          <div className='course-img-container'>
            <img src={image} alt='' className='img' />
          </div>
          <div>
            <input
              type='file'
              name='image'
              className='form-input course-img-input'
              disabled={selectedCourse !== null}
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <h4>Add Course</h4>
          <div className='form-row'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-input'
              name='title'
              id='title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-input'
              name='description'
              id='description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              className='form-input'
              name='price'
              id='price'
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className='form-row checkbox-container'>
            <label htmlFor='publish'>Publish</label>
            <input
              type='checkbox'
              name='publish'
              id='publish'
              checked={isPublished}
              onChange={(e) => setIsPublished(!isPublished)}
            />
          </div>
          <button
            type='submit'
            className='btn btn-block'
            style={{ marginTop: '0.5rem' }}
          >
            {selectedCourse ? 'Edit Course' : 'Add Course'}
          </button>
        </form>
      </div>
    </section>
  );
};
export default CourseDetail;