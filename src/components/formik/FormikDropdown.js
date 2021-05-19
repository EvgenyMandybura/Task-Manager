import React from "react";
import Select, { components } from "react-select";

const Option = (props) => {
    const {
        children,
        isSelected,
        hasValue,
        data: { value },
    } = props;
    const selected = isSelected || (!hasValue && value === "");

    return (
        <components.Option {...props}>
            <div className="d-flex flex-row justify-content-between pr-3">
                {children}
                {selected && <i className="ri-check-line" />}
            </div>
        </components.Option>
    );
};

const FormikDropdown = ({
        field,
        form,
        placeholder,
        isMulti = false,
        options = [],
    }) => {
    const { setFieldTouched, setFieldValue } = form;
    const onChange = (option) => {
        setFieldValue(
            field.name,
            isMulti ? option.map((item) => item.value) : option.value
        );
    };
    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter((option) => field.value.indexOf(option.value) >= 0)
                : options.find((option) => option.value === field.value);
        }
        return isMulti ? [] : "";
    };

    return (
        <Select
            value={getValue()}
            indicatorSeparator={false}
            name={field.name}
            placeholder={placeholder}
            onBlur={() => setFieldTouched(field.name, true)}
            onChange={onChange}
            options={options}
            isMulti={isMulti}
            components={{ Option }}
        />
    );
};

export default FormikDropdown;
