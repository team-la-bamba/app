import { useEffect, useState } from 'react';

export const useForm = (callback, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(values);
        setIsSubmitting(false);
        setValues({});
      }
    }, [callback, errors, isSubmitting, values]);

    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }

      if (typeof validate === 'function') {
        setErrors(validate(values));
      } else {
        setErrors({});
      }

      setIsSubmitting(true);
    };

    const handleChange = (event) => {
      event.persist();
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
      handleChange,
      handleSubmit,
      values,
      errors,
    };
};
