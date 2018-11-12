# antd-password-input-strength

> Antd Input Component with password-strength indicator.

![Preview GIF](https://i.imgur.com/V7Z1Yyr.gif)

## Features

- Drop-in replacement for antd's Input component
- Customizable
- Uses [zxcvbn](https://github.com/dropbox/zxcvbn) for password strength estimation

## Install

```bash
npm install --save antd-password-input-strength
```

or

```bash
yarn add --save antd-password-input-strength
```

## Usage

Use as a drop-in replacement for antd's [Input](https://ant.design/components/input/):

```jsx
<Form>
    <Form.Item label="Password">
        <PasswordInput />
    </Form.Item>
</Form>
```

With ```Form.create()```:

```jsx
<Form>
    <Form.Item label="Password">
    {this.props.form.getFieldDecorator("password", {
        rules: [{
            required: true,
            message: "Please enter your password"
        }]
    })(<PasswordInput inputProps={{}} />)}
    </Form.Item>
</Form>
```

Or with custom settings:

```jsx
<Form>
    <Form.Item label="Password">
        <PasswordInput 
            onChange={this.onChange}
            settings={{
                height: 5
            }}
            inputProps={{
                size: 'large'
            }}
        />
    </Form.Item>
</Form>
```

## API

### PasswordInput

| props | type  | description |
| --    | --    | --        | --            |
| settings | PasswordInputSettings | Strength indicator display settings |
| onChange | function(e) {} | Input onChange event |
| inputProps | [InputProps](https://ant.design/components/input/#Input) | Pass additional properties to the underlying [Input](https://ant.design/components/input/) component

### PasswordInputSettings

| props | type  | description |
| --    | --    | --        | --            |
| colorScheme | ColorScheme | Modify the indicator's color scheme |
| height | number | Change indicator bar height (in px) |
| alwaysVisible | boolean | If false, the bar only appears if the input field isn't empty |

> Default:

```jsx
{
    colorScheme: [...],
    height: 3,
    alwaysVisible: false
}
```

### ColorScheme

| props | type  | description |
| --    | --    | --        | --            |
| levels | string[] | Array of CSS color codes for the different strength levels: <br> `levels[0] = weakest`, `levels[4] = strongest` |
| noLevel| string | CSS color code for non-colored strength indicator bars. |

> Default:

```jsx
{
    levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
    noLevel: "lightgrey"
}
```

## License

MIT