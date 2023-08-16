import { ChangeEvent, useState } from 'react';

const AddCourse = () => {
  const [image, setImage] = useState('/image_upload.svg');

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
              // onChange={handleChangeImage}
            />
          </div>
        </div>
        <form className='form'>
          <h4>Add Course</h4>
          <div className='form-row'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-input'
              name='title'
              id='title'
              required
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
            />
          </div>
          <div className='form-row checkbox-container'>
            <label htmlFor='publish'>Publish</label>
            <input type='checkbox' name='publish' id='publish' required />
          </div>
          <button
            type='submit'
            className='btn btn-block'
            style={{ marginTop: '0.5rem' }}
          >
            Add Course
          </button>
        </form>
      </div>
    </section>
  );
};
export default AddCourse;
