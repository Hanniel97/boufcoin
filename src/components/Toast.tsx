import { ReactNode } from 'react'
import clsx from 'clsx'
import { motion, useIsPresent, type Variants } from 'framer-motion'
import { useTimeoutFn, useUpdateEffect, useMedia } from 'react-use'
import {CheckCircledIcon, Cross2Icon, ExclamationTriangleIcon, InfoCircledIcon,} from '@radix-ui/react-icons'

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info'

export function usePrefersReducedMotion() {
    return useMedia('(prefers-reduced-motion: reduce)')
}

export type Notification = {
    id: string
    message: string
    autoHideDuration?: number
    type?: NotificationTypes
    onClose?: () => void
    action?: ReactNode
}
  
type Props = {
    notification: Notification
}

const getMotionDirectionAndPosition = (
    position: 'top',
    fromEdge = 24
) => {
    const directionPositions: string = 'top'
    const factorPositions: string = 'top'
  
    const direction = directionPositions.includes(position) ? 'y' : 'x'
    let factor = factorPositions.includes(position) ? 1 : -1
  
    // if (position === 'bottom') factor = 1
  
    return {
        [direction]: factor * fromEdge,
    }
}

const motionVariants: Variants = {
    initial: (position: 'top') => {
        return {
            opacity: 0,
            ...getMotionDirectionAndPosition(position),
        }
    },
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: (position) => {
        return {
            opacity: 0,
            ...getMotionDirectionAndPosition(position, 30),
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 1, 1],
            },
        }
    },
}

const notificationStyleVariants: Record<
    NonNullable<Notification['type']>,
    string
> = {
    success: 'bg-green-3 border-green-6',
    error: 'bg-red-3 border-red-6',
    info: 'bg-purple-3 border-purple-6',
    warning: 'bg-yellow-3 border-yellow-6',
}

const notificationIcons: Record<
    NonNullable<Notification['type']>,
    ReactNode
> = {
    success: <CheckCircledIcon />,
    error: <ExclamationTriangleIcon />,
    info: <InfoCircledIcon />,
    warning: <ExclamationTriangleIcon />,
}

const closeButtonStyleVariants: Record<
    NonNullable<Notification['type']>,
    string
> = {
    success: 'hover:bg-green-5 active:bg-green-6',
    error: 'hover:bg-red-5 active:bg-red-6',
    info: 'hover:bg-purple-5 active:bg-purple-6',
    warning: 'hover:bg-yellow-5 active:bg-yellow-6',
}

export const NotificationItem = ({
    notification: { id, autoHideDuration, message, onClose, type = 'info' },
}: Props) => {

    const duration = 6000
    const isPresent = useIsPresent()
    const position = "top"
    const prefersReducedMotion = usePrefersReducedMotion()

    

    // Handle dismiss of a single notification
    const handleDismiss = () => {
        if (isPresent) {
            // dismissNotification(id)
        }
    }

    // Call the dismiss function after a certain timeout
    const [, cancel, reset] = useTimeoutFn(
        handleDismiss,
        autoHideDuration ?? duration
    )

    // Reset or cancel dismiss timeout based on mouse interactions
    const onMouseEnter = () => cancel()
    const onMouseLeave = () => reset()

    // Call `onDismissComplete` when notification unmounts if present
    useUpdateEffect(() => {
        if (!isPresent) {
        onClose?.()
        }
    }, [isPresent])

    return (
        <motion.li
            className={clsx(
                'flex w-max items-center shadow px-4 py-3 rounded border transition-colors duration-100 min-w-[260px] text-sm pointer-events-auto',
                notificationStyleVariants[type]
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            layout="position"
            custom={position}
            variants={!prefersReducedMotion ? motionVariants : {}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="flex gap-2 items-center">
                {notificationIcons[type]}
                <span className="max-w-sm font-medium">{message}</span>
            </div>
        
            <div className="pl-4 ml-auto">
                <button
                    type='button'
                    onClick={handleDismiss}
                    className={clsx(
                        'p-1 rounded transition-colors duration-100',
                        closeButtonStyleVariants[type]
                    )}
                >
                    <Cross2Icon />
                </button>
            </div>
        </motion.li>
    )
}