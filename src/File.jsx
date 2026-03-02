import React, { useRef, useState } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import useSchemaField from './useSchemaField'

function File(props) {
    const {
        form,
        localization: { getLocalizedString },
        otherProps
    } = props

    const fieldProps = useSchemaField(props)

    const valid = props.valid !== undefined ? props.valid : fieldProps.valid
    let error = props.error !== undefined ? props.error : fieldProps.error
    const onChangeValidate = props.onChangeValidate !== undefined ? props.onChangeValidate : fieldProps.onChangeValidate

    const fileInput = useRef(null)
    const [fileName, setFileName] = useState('')
    const [readError, setReadError] = useState(null)

    const handleUploadClick = () => {
        if (fileInput.current && !form.readonly) {
            fileInput.current.click()
        }
    }

    const onChange = (e) => {
        setReadError(null)
        const files = e.target.files

        if (files && files.length > 0) {
            const file = files[0]
            setFileName(file.name)

            const reader = new FileReader()
            reader.onload = (event) => {
                const result = event.target.result
                if (typeof result !== 'string') {
                    setReadError(new Error('Failed to read file as base64 string'))
                    return
                }
                // result is a data URL: data:application/octet-stream;base64,...
                const base64Data = result.split(',')[1]

                onChangeValidate(e, base64Data)
            }
            reader.onerror = () => {
                setReadError(new Error('Error reading configuration file'))
            }
            reader.onabort = () => {
                setReadError(new Error('File read aborted'))
            }
            reader.readAsDataURL(file)
        }
    }

    if (readError) {
        error = readError.message
    }

    return (
        <FormControl
            fullWidth
            error={!valid || !!error}
            style={{ marginBottom: '16px', marginTop: '16px', ...form.style }}
            className={form.className}
            {...otherProps}
            {...form.otherProps}
        >
            {form.title && <FormLabel component="legend">{getLocalizedString(form.title)}</FormLabel>}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <Button
                    variant="outlined"
                    onClick={handleUploadClick}
                    disabled={form.readonly}
                >
                    {getLocalizedString('Select File')}
                </Button>
                <span style={{ marginLeft: '12px', fontSize: '14px', color: '#666' }}>
                    {fileName ? `${getLocalizedString('Selected:')} ${fileName}` : getLocalizedString('No file selected')}
                </span>
            </div>

            <input
                type="file"
                ref={fileInput}
                onChange={onChange}
                style={{ display: 'none' }}
                accept={form.accept || '*/*'}
                disabled={form.readonly}
            />

            {(error || form.description) && (
                <FormHelperText>
                    {getLocalizedString(error || form.description)}
                </FormHelperText>
            )}
        </FormControl>
    )
}

File.defaultProps = {
    otherProps: undefined,
    localization: {
        getLocalizedString: (v) => v
    }
}

export default File
