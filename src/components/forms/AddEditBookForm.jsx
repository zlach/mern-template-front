import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import omitBy from 'lodash/omitBy'
import '../../styles/components/forms/index.css'
import { CENTURIES, LANGUAGES } from '../../utils/constants'


const AddEditBookForm = props => {
  const [numAuthors, setNumAuthors] = useState([])
  const [numTranslators, setNumTranslators] = useState([])
  const [numEditors, setNumEditors] = useState([])
  const { register, handleSubmit, setValue, setError, clearErrors, watch, formState: { errors }, reset } = useForm()
  const { books } = useSelector(state => state.book)
  const watchIsbn13 = watch('isbn13')

  useEffect(() => {
    reset()
    setNumAuthors([])
    setNumTranslators([])
    setNumEditors([])
  }, [books, reset])

  useEffect(() => {
    if (!isEmpty(watchIsbn13) && watchIsbn13.length > 12) {
      const formatted = watchIsbn13.replace(/-/g, '')
      const found = books.find(b => b.isbn13 === formatted);
      if (found)
        return setError('duplicateError')
    }
    clearErrors('duplicateError')
  }, [watchIsbn13])

  const onSubmit = data => {
    const clean = omitBy(data, v => isEmpty(trim(v)) || trim(v) === 'select')
    props.submitBook(clean)
  }

  const addAuthor = () => {
    if (numAuthors.length < 4)
      setNumAuthors(numAuthors.concat('i'))
  }

  const subtractAuthor = () => {
    setValue(`author${numAuthors.length}`, '')
    if (numAuthors.length === 1)
      setNumAuthors([])
    else
      setNumAuthors(numAuthors.slice(0, -1))
  }

  const addTranslator = () => {
    if (numTranslators.length < 4)
      setNumTranslators(numTranslators.concat('i'))
  }

  const subtractTranslator = () => {
    setValue(`translator${numTranslators.length}`, '')
    if (numTranslators.length === 1)
      setNumTranslators([])
    else
      setNumTranslators(numTranslators.slice(0, -1))
  }

  const addEditor = () => {
    if (numEditors.length < 4)
      setNumEditors(numEditors.concat('i'))
  }

  const subtractEditor = () => {
    setValue(`editor${numEditors.length}`, '')
    if (numEditors.length === 1)
      setNumEditors([])
    else
      setNumEditors(numEditors.slice(0, -1))
  }

  return (
    <form className="wick-form container-fluid" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <label className="w-50">
          title:
          <input className="w-100" {...register('title', { required: 'Required: please enter a title' })} />
          <div>{errors.title ? <small className="text-danger">{errors.title.message}</small> : <small style={{ float: 'right' }}>Required</small>}</div>
        </label>
        <label className="w-50">
          subtitle:
          <input className="w-100" {...register('subtitle')} />
          <div>{errors.subtitle ? <small className="text-danger">{errors.subtitle.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
      </div>
      <div className="row">
        <label className="w-50">
          publisher:
          <input className="w-100" {...register('publisher')} />
          <div>{errors.publisher ? <small className="text-danger">{errors.publisher.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
        <label className="w-50">
          tagline:
          <input className="w-100" {...register('tagline')} />
          <div>{errors.tagline ? <small className="text-danger">{errors.tagline.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
      </div>
      <div className="row">
        <label className="w-50">
          isbn10:
          <input className="w-100" {...register('isbn10', { pattern: /^\d{9}(\d|X){1}$/ })} />
          <div>{errors.isbn10 ? <small className="text-danger">Must be 10 characters, digits only (except X)</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
        <label className="w-50">
          isbn13:
          <input className="w-100" {...register('isbn13', { required: true, pattern: /^\d{13}$/, setValueAs: v => v.replace(/-/g, '') })} />
          <div>{errors.isbn13 ? <small className="text-danger">Required: must be 13 characters, digits only</small> : <small style={{ float: 'right' }}>Required</small>}</div>
          {errors.duplicateError ? <div><small className="text-danger">A book with this isbn13 already exists</small></div> : null}
        </label>
      </div>
      <div className="row">
        <label className="w-50">
          language:
          <select className="w-100" {...register('language1')}>
            {LANGUAGES.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
          <div>{errors.language1 ? <small className="text-danger">{errors.language1.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
        <label className="w-50">
          original language:
          <select className="w-100" {...register('originalLanguage1')}>
            {LANGUAGES.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
          <div>{errors.originalLanguage1 ? <small className="text-danger">{errors.originalLanguage1.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
      </div>
      <div className="row">
        <label className="w-50">
          language 2:
          <select className="w-100" {...register('language2')}>
            {LANGUAGES.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
          <div>{errors.language2 ? <small className="text-danger">{errors.language2.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
        <label className="w-50">
          original language 2:
          <select className="w-100" {...register('originalLanguage2')}>
            {LANGUAGES.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
          <div>{errors.originalLanguage2 ? <small className="text-danger">{errors.originalLanguage2.message}</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
      </div>
      <div className="row">
        <label className="w-50">
          century:
          <select className="w-100" {...register('century')}>
            {CENTURIES.map((value, i) => <option key={i} value={value}>{value}</option>)}
          </select>
          <div>{errors.century?.message || <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
        <label className="w-50">
          list price:
          <input className="w-100" {...register('price', { pattern: /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/ })} />
          <div>{errors.price ? <small className="text-danger">Must be valid monetary value</small> : <small style={{ float: 'right' }}>Optional</small>}</div>
        </label>
      </div>
      <div className="row">
        <div className="w-50 d-flex justify-content-between">
          <span className='add-button' onClick={addAuthor}>add author +</span>
          {numAuthors.length > 0 && <span className='add-button' onClick={subtractAuthor}>subtract author -</span>}
        </div>
      </div>
      <div className="row">
        {numAuthors.map((value, i) => (
          <label key={i + 1} className="w-50 d-block">
            <div>author {i + 1}:</div>
            <input className="w-100" {...register(`author${i + 1}`, { required: 'Enter author or remove field' })} />
            <div>{errors[`author${i + 1}`] ? <small className="text-danger">{errors[`author${i + 1}`].message}</small> : <small style={{ float: 'right' }}>Required</small>}</div>
          </label>
        ))}
      </div>
      <div className="row">
        <div className="w-50 d-flex justify-content-between">
          <span className='add-button' onClick={addTranslator}>add translator +</span>
          {numTranslators.length > 0 && <span className='add-button' onClick={subtractTranslator}>subtract translator -</span>}
        </div>
      </div>
      <div className="row">
        {numTranslators.map((value, i) => (
          <label key={i + 1} className="w-50 d-block">
            <div>translator {i + 1}:</div>
            <input className="w-100" {...register(`translator${i + 1}`, { required: 'Enter translator or remove field' })} />
            <div>{errors[`translator${i + 1}`] ? <small className="text-danger">{errors[`translator${i + 1}`].message}</small> : <small style={{ float: 'right' }}>Required</small>}</div>
          </label>
        ))}
      </div>
      <div className="row">
        <div className="w-50 d-flex justify-content-between">
          <span className='add-button' onClick={addEditor}>add editor +</span>
          {numEditors.length > 0 && <span className='add-button' onClick={subtractEditor}>subtract editor -</span>}
        </div>
      </div>
      <div className="row">
        {numEditors.map((value, i) => (
          <label key={i + 1} className="w-50 d-block">
            <div>editor {i + 1}:</div>
            <input className="w-100" {...register(`editor${i + 1}`, { required: 'Enter editor or remove field' })} />
            <div>{errors[`editor${i + 1}`] ? <small className="text-danger">{errors[`editor${i + 1}`].message}</small> : <small style={{ float: 'right' }}>Required</small>}</div>
          </label>
        ))}
      </div>
      <input className='mt-4' type="submit" />
    </form>
  );
}

export default AddEditBookForm;
