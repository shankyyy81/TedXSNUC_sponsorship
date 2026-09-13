import { forwardRef } from "react";
import clsx from "clsx";

export const TextField = forwardRef(function TextField(
  { label, name, type = "text", required, value, onChange, onBlur, error, placeholder, maxLength, hint, showCounter, style = {}, ...rest },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {hint && <span className="form-hint">{hint}</span>}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx("form-input", error && "has-error")}
        {...rest}
      />
      {showCounter && maxLength && (
        <span className={clsx("form-charcount", value.length >= maxLength && "limit")}>
          {value.length} / {maxLength}
        </span>
      )}
      {error && (
        <span className="form-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export const TextareaField = forwardRef(function TextareaField(
  { label, name, required, value, onChange, onBlur, error, placeholder, rows = 4, hint, style = {} },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {hint && <span className="form-hint">{hint}</span>}
      <textarea
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx("form-textarea", error && "has-error")}
      />
      {error && (
        <span className="form-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export const SelectField = forwardRef(function SelectField(
  { label, name, required, value, onChange, onBlur, error, options, placeholder = "Select an option", style = {} },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      <select
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx("form-select", error && "has-error")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <span className="form-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export const CheckboxField = forwardRef(function CheckboxField(
  { name, label, checked, onChange, error, style = {} },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <label className="form-option-row" htmlFor={name}>
        <input
          ref={ref}
          type="checkbox"
          className="form-checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span>{label}</span>
      </label>
      {error && (
        <span className="form-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export const CheckboxGroupField = forwardRef(function CheckboxGroupField(
  { legend, required, options, values, onToggle, error, hint, style = {} },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <fieldset className="form-fieldset" ref={ref} tabIndex={-1}>
        <legend className="form-legend">
          {legend}
          {required && <span className="form-required">*</span>}
        </legend>
        {hint && <span className="form-hint">{hint}</span>}
        {options.map((opt) => (
          <label key={opt} className="form-option-row">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={values.includes(opt)}
              onChange={() => onToggle(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </fieldset>
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export const RadioGroupField = forwardRef(function RadioGroupField(
  { legend, name, required, options, value, onChange, error, style = {} },
  ref
) {
  return (
    <div className="form-field" style={style}>
      <fieldset className="form-fieldset" ref={ref} tabIndex={-1}>
        <legend className="form-legend">
          {legend}
          {required && <span className="form-required">*</span>}
        </legend>
        {options.map((opt) => (
          <label key={opt.value} className="form-option-row">
            <input
              type="radio"
              className="form-radio"
              name={name}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </fieldset>
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
