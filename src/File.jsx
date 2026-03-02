import React, { Component } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

class File extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef()
        this.state = {
            fileName: ''
        }
    }

    handleUploadClick = () => {
        if (this.fileInput.current) {
            this.fileInput.current.click()
        }
    }

    onChange = (e) => {
        const { model, form, onChange } = this.props
        const files = e.target.files

        if (files && files.length > 0) {
            const file = files[0]
            this.setState({ fileName: file.name })

            const reader = new FileReader()
            reader.onload = (event) => {
                const result = event.target.result
                // result is a data URL: data:application/octet-stream;base64,...
                const base64Data = result.split(',')[1]

                onChange(form.key, base64Data, form.type, form)
            }
            reader.readAsDataURL(file)
        }
    }

    render() {
        const { form, errorText } = this.props
        const { fileName } = this.state

        return (
            <FormControl
                fullWidth
                error={!!errorText}
                style={{ marginBottom: '16px', marginTop: '16px' }}
            >
                {form.title && <FormLabel component="legend">{form.title}</FormLabel>}

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <Button
                        variant="outlined"
                        onClick={this.handleUploadClick}
                    >
                        Select File
                    </Button>
                    <span style={{ marginLeft: '12px', fontSize: '14px', color: '#666' }}>
                        {fileName ? `Selected: ${fileName}` : 'No file selected'}
                    </span>
                </div>

                <input
                    type="file"
                    ref={this.fileInput}
                    onChange={this.onChange}
                    style={{ display: 'none' }}
                    accept={form.accept || '*/*'}
                />

                {errorText && <FormHelperText>{errorText}</FormHelperText>}
                {form.description && <FormHelperText>{form.description}</FormHelperText>}
            </FormControl>
        )
    }
}

export default File
