import React from "react";
import { Input } from "antd";
import zxcvbn from "zxcvbn";
import { InputProps } from "antd/lib/input";

export class PasswordInput extends React.Component<PasswordInputProps> {
    public static defaultProps: Partial<PasswordInputProps> = {
        settings: {
            colorScheme: {
                levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
                noLevel: "lightgrey"
            },
            height: 3,
            alwaysVisible: false
        }
    };

    state = {
        level: -1
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const score = value.length == 0 ? -1 : zxcvbn(value).score;

        this.setState({ level: score });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    render() {
        const { settings, inputProps, ...rest } = this.props;
        return (
            <div>
                <Input.Password {...inputProps} {...rest} onChange={this.onChange} />
                <PasswordStrengthIndicator
                    level={this.state.level}
                    settings={settings!}
                />
            </div>
        );
    }
}

export const PasswordStrengthIndicator = ({ level, settings }: PasswordStrengthIndicatorProps) => {
    if (!settings.alwaysVisible && level < 0) {
        return null;
    }

    const indicators = [];

    for (let i = 0; i < 5; i++) {
        const color =
            i <= level
                ? settings.colorScheme.levels[level]
                : settings.colorScheme.noLevel;
        indicators.push(<div key={`indicator-${i}`} style={getIndicatorStyle(color, settings.height)} />);
    }

    return <div style={getWrapperStyle(settings.height)}>{indicators}</div>;
};

function getWrapperStyle(height: number) {
    return {
        lineHeight: height + "px"
    };
}

function getIndicatorStyle(color: string, height: number) {
    return {
        display: "inline-block",
        width: "20%",
        backgroundColor: color,
        height: height + "px",
        borderRadius: "2px"
    };
}

export interface PasswordInputProps {
    settings?: PasswordInputSettings;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: InputProps;
}

export interface PasswordInputSettings {
    colorScheme: ColorScheme;
    height: number;
    alwaysVisible: boolean;
}

interface PasswordStrengthIndicatorProps {
    level: number;
    settings: PasswordInputSettings;
}

export interface ColorScheme {
    levels: string[],
    noLevel: string;
}
