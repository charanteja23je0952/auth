import { z } from 'zod';

const idSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID')
});

type IdParams = z.infer<typeof idSchema>;

type EditProfileBody = {
    email: string;
    data: string;
};

type AdminEditBody = {
    email: string;
    role: string;
    data: string;
};

export {
    idSchema,
    type IdParams,
    type EditProfileBody,
    type AdminEditBody
};
