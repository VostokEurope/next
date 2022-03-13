
import { TrackingException } from "@/exceptions/TrackingException"
import amplitude from 'amplitude-js'


export default () => {
    amplitude.getInstance().init(import.meta.env.VITE_AMPLITUDE_API_KEY, null, {})

    const Amplitude = amplitude.getInstance()

    const sendPageView = (page, route) => {
        try {
            const meta = Object.assign({}, route.meta)
            delete meta.scheme

            Amplitude.logEvent(route.name, {
                screen_name: page,
                title: route.name,
                ...route.params,
                ...meta,
                ...route.query,
            })

        } catch (e) {
            throw new TrackingException('Error tracking PageView ', page)
        }
    }



    const sendPagination = ({ page }) => {
        Amplitude.logEvent('Pagination',{ page })

    }


    const sendUser = (user) => {
        try {
            Amplitude.setUserId(user?.id)

            const identify = new amplitude.Identify()
                .set('gender', user?.gender)
                .set('tribe', user?.tribe?.code)
                .set('tribeId', user?.tribe?.id)
                .set('premium', user?.memberships?.some(membership => (membership.type === 'premium' || membership.type === 'coach') && membership.status === 'active'))

            Amplitude.identify(identify)
        } catch (e) {
            throw new TrackingException('Error tracking setting userId', user?.id)
        }
    }

    const sendLogin = (user) => {
        try {
            Amplitude.logEvent('login',{ userId: user?.id })
            sendUser(user)

        } catch (e) {
            throw new TrackingException('Error tracking Login with user: id', user?.id)
        }
    }

    const sendButton = ({ name, cta, options = {} }) => {
        try {
            Amplitude.logEvent(name, { cta: cta, ...options})
        } catch (e) {
            throw new TrackingException('Error tracking Button with cta', cta)
        }
    }



    return {
        sendPageView,
        sendButton,
        sendUser,
        sendPagination,
        sendLogin
    }

}
