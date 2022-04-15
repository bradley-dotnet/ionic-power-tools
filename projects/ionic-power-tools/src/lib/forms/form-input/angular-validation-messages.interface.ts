import { InjectionToken } from "@angular/core";

export interface AngularValidationMessages {
    readonly min: (label: string, details: {min: number, actual: number}) => string;
    readonly max: (label: string, details: {max: number, actual: number}) => string;
    readonly required: (label: string) => string;
    readonly email: (label: string) => string;
    readonly minlength: (label: string, details: {requiredLength: number, actualLength: number}) => string;
    readonly maxlength: (label: string, details: {requiredLength: number, actualLength: number}) => string;
    readonly pattern: (label: string, details: {requiredPattern: string, actualValue: string}) => string;
}

export const DefaultAngularValidationMessages: AngularValidationMessages = {
    min: (label, {min, actual}) => {
        return `${actual} ${label} is less than the allowed ${min}`;
    },
    max: (label, {max, actual}) => {
        return `${actual} ${label} is greater than the allowed ${max}`;
    },
    required: (label) => {
        return `${label} is required`;
    },
    email: (label) => {
        return `${label} must be a valid email`;
    },
    minlength: (label, {requiredLength, actualLength}) => {
        return `${label} must be at least ${requiredLength} characters long but is only ${actualLength}`;
    },
    maxlength: (label, {requiredLength, actualLength}) => {
        return `${label} must be no more than ${requiredLength} characters long but is ${actualLength}`;
    },
    pattern: (label, {requiredPattern, actualValue}) => {
        return `${label} must match ${requiredPattern}`;
    }
}

export const ANGULAR_VALIDATION_ERRORS = new InjectionToken('Ionic Power Tools messages for built-in Angular validators');