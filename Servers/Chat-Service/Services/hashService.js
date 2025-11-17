import bcrypt from 'bcryptjs'

export const hashMessage = async(message) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(message,salt);
}

export const compareMessage = async(message,hashedMessage) => {
    return await bcrypt.compare(message,hashedMessage);
}