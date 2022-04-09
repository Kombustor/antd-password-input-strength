import React, { useEffect, useState } from "react";
import { Form, FormItemProps, Input } from "antd";
import { PasswordStrength, PasswordStrengthCode } from 'tai-password-strength';
import { InputProps, InputRef } from "antd/lib/input";
import { Rule } from 'antd/lib/form';

const PASSWORD_STRENGTH = new PasswordStrength();
const PASSWORD_STRENGTH_CODE = ['VERY_WEAK', 'WEAK', 'REASONABLE', 'STRONG', 'VERY_STRONG'];
export const defaultSettings = {
    colorScheme: {
        levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
        noLevel: "lightgrey"
    },
    height: 3,
    alwaysVisible: false
}

interface LevelChangeProps {
    onLevelChange?: (newLevel: number) => void;
}

export interface PasswordInputProps extends LevelChangeProps {
    settings?: PasswordInputSettings;
}

export const PasswordInput = React.forwardRef(({
    settings = defaultSettings,
    onLevelChange,
    ...props
}: PasswordInputProps & Partial<InputProps>, ref: React.Ref<InputRef>) => {
    const [input, setInput] = useState('')

    return (
        <>
            <Input.Password
                {...props}
                ref={ref}
                value={input}
                onChange={(e) => { setInput(e.target.value); props?.onChange?.(e) }}
            />
            <PasswordStrengthIndicator
                input={input}
                onLevelChange={onLevelChange}
                settings={settings}
            />
        </>
    );
})

interface PasswordStrengthIndicatorProps extends LevelChangeProps {
    input: string;
    settings: PasswordInputSettings;
}

export const PasswordStrengthIndicator = ({ input, settings, onLevelChange }: PasswordStrengthIndicatorProps) => {
    // Calculate level
    const level = React.useMemo(() => {
        return input.length == 0 ? -1 : PASSWORD_STRENGTH_CODE.indexOf(PASSWORD_STRENGTH.check(input).strengthCode);
    }, [input])

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

    useEffect(() => {
        onLevelChange?.(level);
    }, [level])

    if (!settings.alwaysVisible && level < 0) {
        return null;
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

export interface PasswordInputSettings {
    colorScheme: ColorScheme;
    height: number;
    alwaysVisible: boolean;
}

export interface ColorScheme {
    levels: string[],
    noLevel: string;
}
