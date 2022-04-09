import React, { useState } from "react";
import { Input } from "antd";
import { PasswordStrength, PasswordStrengthCode } from 'tai-password-strength';
import { InputProps, InputRef } from "antd/lib/input";

export interface PasswordInputProps {
    settings?: PasswordInputSettings;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO validation
// TODO test all README examples

const PASSWORD_STRENGTH = new PasswordStrength();

export const PasswordInput = React.forwardRef(({
    settings = {
        colorScheme: {
            levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
            noLevel: "lightgrey"
        },
        height: 3,
        alwaysVisible: false
    },
    ...props
}: PasswordInputProps & Partial<InputProps>, ref: React.Ref<InputRef>) => {
    const [input, setInput] = useState('')

    return (
        <>
            <Input.Password {...props} ref={ref} onChange={(e) => {setInput(e.target.value); props?.onChange?.(e)}} />
            <PasswordStrengthIndicator
                input={input}
                settings={settings}
            />
        </>
    );
})

interface PasswordStrengthIndicatorProps {
    input: string;
    settings: PasswordInputSettings;
}

export const PasswordStrengthIndicator = ({ input, settings }: PasswordStrengthIndicatorProps) => {
    // Calculate level
    const level = React.useMemo(() => {
        return input.length == 0 ? -1 : Object.keys(PasswordStrengthCode).indexOf(PASSWORD_STRENGTH.check(input).strengthCode);
    }, [input])

    if (!settings.alwaysVisible && level < 0) {
        return null;
    }

    // Calculate indicators
    const indicators: React.ReactElement[] = React.useMemo(() => {
        const ind = [];
        for (let i = 0; i < 5; i++) {
            const color =
                i <= level
                    ? settings.colorScheme.levels[level]
                    : settings.colorScheme.noLevel;
            ind.push(<div key={`indicator-${i}`} style={getIndicatorStyle(color, settings.height)} />);
        }

        return ind;
    }, [level, settings])

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

export interface PasswordInputSettings {
    colorScheme: ColorScheme;
    height: number;
    alwaysVisible: boolean;
}

export interface ColorScheme {
    levels: string[],
    noLevel: string;
}
