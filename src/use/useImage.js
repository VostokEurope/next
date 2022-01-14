const baseUrl = import.meta.env.VITE_IMAGE_SERVER

export default () => {
    const resolveImage = (image) => {
        if (!image) return

        return image?.includes('http') || image?.includes('base64')
            ? image
            : baseUrl + image

    }

    return {
        resolveImage
    }
}
