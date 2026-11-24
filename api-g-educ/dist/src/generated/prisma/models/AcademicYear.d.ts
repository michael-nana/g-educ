import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AcademicYearModel = runtime.Types.Result.DefaultSelection<Prisma.$AcademicYearPayload>;
export type AggregateAcademicYear = {
    _count: AcademicYearCountAggregateOutputType | null;
    _min: AcademicYearMinAggregateOutputType | null;
    _max: AcademicYearMaxAggregateOutputType | null;
};
export type AcademicYearMinAggregateOutputType = {
    id: string | null;
    label: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isCurrent: boolean | null;
    createdAt: Date | null;
};
export type AcademicYearMaxAggregateOutputType = {
    id: string | null;
    label: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isCurrent: boolean | null;
    createdAt: Date | null;
};
export type AcademicYearCountAggregateOutputType = {
    id: number;
    label: number;
    startDate: number;
    endDate: number;
    isCurrent: number;
    createdAt: number;
    _all: number;
};
export type AcademicYearMinAggregateInputType = {
    id?: true;
    label?: true;
    startDate?: true;
    endDate?: true;
    isCurrent?: true;
    createdAt?: true;
};
export type AcademicYearMaxAggregateInputType = {
    id?: true;
    label?: true;
    startDate?: true;
    endDate?: true;
    isCurrent?: true;
    createdAt?: true;
};
export type AcademicYearCountAggregateInputType = {
    id?: true;
    label?: true;
    startDate?: true;
    endDate?: true;
    isCurrent?: true;
    createdAt?: true;
    _all?: true;
};
export type AcademicYearAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicYearWhereInput;
    orderBy?: Prisma.AcademicYearOrderByWithRelationInput | Prisma.AcademicYearOrderByWithRelationInput[];
    cursor?: Prisma.AcademicYearWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AcademicYearCountAggregateInputType;
    _min?: AcademicYearMinAggregateInputType;
    _max?: AcademicYearMaxAggregateInputType;
};
export type GetAcademicYearAggregateType<T extends AcademicYearAggregateArgs> = {
    [P in keyof T & keyof AggregateAcademicYear]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAcademicYear[P]> : Prisma.GetScalarType<T[P], AggregateAcademicYear[P]>;
};
export type AcademicYearGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicYearWhereInput;
    orderBy?: Prisma.AcademicYearOrderByWithAggregationInput | Prisma.AcademicYearOrderByWithAggregationInput[];
    by: Prisma.AcademicYearScalarFieldEnum[] | Prisma.AcademicYearScalarFieldEnum;
    having?: Prisma.AcademicYearScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AcademicYearCountAggregateInputType | true;
    _min?: AcademicYearMinAggregateInputType;
    _max?: AcademicYearMaxAggregateInputType;
};
export type AcademicYearGroupByOutputType = {
    id: string;
    label: string;
    startDate: Date;
    endDate: Date;
    isCurrent: boolean;
    createdAt: Date;
    _count: AcademicYearCountAggregateOutputType | null;
    _min: AcademicYearMinAggregateOutputType | null;
    _max: AcademicYearMaxAggregateOutputType | null;
};
export type GetAcademicYearGroupByPayload<T extends AcademicYearGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AcademicYearGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AcademicYearGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AcademicYearGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AcademicYearGroupByOutputType[P]>;
}>>;
export type AcademicYearWhereInput = {
    AND?: Prisma.AcademicYearWhereInput | Prisma.AcademicYearWhereInput[];
    OR?: Prisma.AcademicYearWhereInput[];
    NOT?: Prisma.AcademicYearWhereInput | Prisma.AcademicYearWhereInput[];
    id?: Prisma.UuidFilter<"AcademicYear"> | string;
    label?: Prisma.StringFilter<"AcademicYear"> | string;
    startDate?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    isCurrent?: Prisma.BoolFilter<"AcademicYear"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    students?: Prisma.StudentProfileListRelationFilter;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classChangeRequest?: Prisma.ClassChangeRequestListRelationFilter;
};
export type AcademicYearOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isCurrent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    students?: Prisma.StudentProfileOrderByRelationAggregateInput;
    enrollments?: Prisma.ClassEnrollmentOrderByRelationAggregateInput;
    classChangeRequest?: Prisma.ClassChangeRequestOrderByRelationAggregateInput;
};
export type AcademicYearWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    label?: string;
    AND?: Prisma.AcademicYearWhereInput | Prisma.AcademicYearWhereInput[];
    OR?: Prisma.AcademicYearWhereInput[];
    NOT?: Prisma.AcademicYearWhereInput | Prisma.AcademicYearWhereInput[];
    startDate?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    isCurrent?: Prisma.BoolFilter<"AcademicYear"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"AcademicYear"> | Date | string;
    students?: Prisma.StudentProfileListRelationFilter;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classChangeRequest?: Prisma.ClassChangeRequestListRelationFilter;
}, "id" | "label">;
export type AcademicYearOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isCurrent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AcademicYearCountOrderByAggregateInput;
    _max?: Prisma.AcademicYearMaxOrderByAggregateInput;
    _min?: Prisma.AcademicYearMinOrderByAggregateInput;
};
export type AcademicYearScalarWhereWithAggregatesInput = {
    AND?: Prisma.AcademicYearScalarWhereWithAggregatesInput | Prisma.AcademicYearScalarWhereWithAggregatesInput[];
    OR?: Prisma.AcademicYearScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AcademicYearScalarWhereWithAggregatesInput | Prisma.AcademicYearScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AcademicYear"> | string;
    label?: Prisma.StringWithAggregatesFilter<"AcademicYear"> | string;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"AcademicYear"> | Date | string;
    endDate?: Prisma.DateTimeWithAggregatesFilter<"AcademicYear"> | Date | string;
    isCurrent?: Prisma.BoolWithAggregatesFilter<"AcademicYear"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AcademicYear"> | Date | string;
};
export type AcademicYearCreateInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileCreateNestedManyWithoutAcademicYearInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearUncheckedCreateInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutAcademicYearInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUpdateManyWithoutAcademicYearNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutAcademicYearNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearCreateManyInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
};
export type AcademicYearUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AcademicYearUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AcademicYearCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isCurrent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AcademicYearMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isCurrent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AcademicYearMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isCurrent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AcademicYearScalarRelationFilter = {
    is?: Prisma.AcademicYearWhereInput;
    isNot?: Prisma.AcademicYearWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type AcademicYearCreateNestedOneWithoutStudentsInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutStudentsInput, Prisma.AcademicYearUncheckedCreateWithoutStudentsInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutStudentsInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutStudentsInput, Prisma.AcademicYearUncheckedCreateWithoutStudentsInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutStudentsInput;
    upsert?: Prisma.AcademicYearUpsertWithoutStudentsInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicYearUpdateToOneWithWhereWithoutStudentsInput, Prisma.AcademicYearUpdateWithoutStudentsInput>, Prisma.AcademicYearUncheckedUpdateWithoutStudentsInput>;
};
export type AcademicYearCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.AcademicYearUpsertWithoutEnrollmentsInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicYearUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.AcademicYearUpdateWithoutEnrollmentsInput>, Prisma.AcademicYearUncheckedUpdateWithoutEnrollmentsInput>;
};
export type AcademicYearCreateNestedOneWithoutClassChangeRequestInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedCreateWithoutClassChangeRequestInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutClassChangeRequestInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicYearCreateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedCreateWithoutClassChangeRequestInput>;
    connectOrCreate?: Prisma.AcademicYearCreateOrConnectWithoutClassChangeRequestInput;
    upsert?: Prisma.AcademicYearUpsertWithoutClassChangeRequestInput;
    connect?: Prisma.AcademicYearWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicYearUpdateToOneWithWhereWithoutClassChangeRequestInput, Prisma.AcademicYearUpdateWithoutClassChangeRequestInput>, Prisma.AcademicYearUncheckedUpdateWithoutClassChangeRequestInput>;
};
export type AcademicYearCreateWithoutStudentsInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearUncheckedCreateWithoutStudentsInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearCreateOrConnectWithoutStudentsInput = {
    where: Prisma.AcademicYearWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutStudentsInput, Prisma.AcademicYearUncheckedCreateWithoutStudentsInput>;
};
export type AcademicYearUpsertWithoutStudentsInput = {
    update: Prisma.XOR<Prisma.AcademicYearUpdateWithoutStudentsInput, Prisma.AcademicYearUncheckedUpdateWithoutStudentsInput>;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutStudentsInput, Prisma.AcademicYearUncheckedCreateWithoutStudentsInput>;
    where?: Prisma.AcademicYearWhereInput;
};
export type AcademicYearUpdateToOneWithWhereWithoutStudentsInput = {
    where?: Prisma.AcademicYearWhereInput;
    data: Prisma.XOR<Prisma.AcademicYearUpdateWithoutStudentsInput, Prisma.AcademicYearUncheckedUpdateWithoutStudentsInput>;
};
export type AcademicYearUpdateWithoutStudentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearUncheckedUpdateWithoutStudentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearCreateWithoutEnrollmentsInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearUncheckedCreateWithoutEnrollmentsInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutAcademicYearInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.AcademicYearWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedCreateWithoutEnrollmentsInput>;
};
export type AcademicYearUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.AcademicYearUpdateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.AcademicYearWhereInput;
};
export type AcademicYearUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.AcademicYearWhereInput;
    data: Prisma.XOR<Prisma.AcademicYearUpdateWithoutEnrollmentsInput, Prisma.AcademicYearUncheckedUpdateWithoutEnrollmentsInput>;
};
export type AcademicYearUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutAcademicYearNestedInput;
    classChangeRequest?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearCreateWithoutClassChangeRequestInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileCreateNestedManyWithoutAcademicYearInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearUncheckedCreateWithoutClassChangeRequestInput = {
    id?: string;
    label: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent?: boolean;
    createdAt?: Date | string;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutAcademicYearInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput;
};
export type AcademicYearCreateOrConnectWithoutClassChangeRequestInput = {
    where: Prisma.AcademicYearWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedCreateWithoutClassChangeRequestInput>;
};
export type AcademicYearUpsertWithoutClassChangeRequestInput = {
    update: Prisma.XOR<Prisma.AcademicYearUpdateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedUpdateWithoutClassChangeRequestInput>;
    create: Prisma.XOR<Prisma.AcademicYearCreateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedCreateWithoutClassChangeRequestInput>;
    where?: Prisma.AcademicYearWhereInput;
};
export type AcademicYearUpdateToOneWithWhereWithoutClassChangeRequestInput = {
    where?: Prisma.AcademicYearWhereInput;
    data: Prisma.XOR<Prisma.AcademicYearUpdateWithoutClassChangeRequestInput, Prisma.AcademicYearUncheckedUpdateWithoutClassChangeRequestInput>;
};
export type AcademicYearUpdateWithoutClassChangeRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUpdateManyWithoutAcademicYearNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearUncheckedUpdateWithoutClassChangeRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutAcademicYearNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput;
};
export type AcademicYearCountOutputType = {
    students: number;
    enrollments: number;
    classChangeRequest: number;
};
export type AcademicYearCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    students?: boolean | AcademicYearCountOutputTypeCountStudentsArgs;
    enrollments?: boolean | AcademicYearCountOutputTypeCountEnrollmentsArgs;
    classChangeRequest?: boolean | AcademicYearCountOutputTypeCountClassChangeRequestArgs;
};
export type AcademicYearCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearCountOutputTypeSelect<ExtArgs> | null;
};
export type AcademicYearCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProfileWhereInput;
};
export type AcademicYearCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
};
export type AcademicYearCountOutputTypeCountClassChangeRequestArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
};
export type AcademicYearSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isCurrent?: boolean;
    createdAt?: boolean;
    students?: boolean | Prisma.AcademicYear$studentsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.AcademicYear$enrollmentsArgs<ExtArgs>;
    classChangeRequest?: boolean | Prisma.AcademicYear$classChangeRequestArgs<ExtArgs>;
    _count?: boolean | Prisma.AcademicYearCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["academicYear"]>;
export type AcademicYearSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isCurrent?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["academicYear"]>;
export type AcademicYearSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isCurrent?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["academicYear"]>;
export type AcademicYearSelectScalar = {
    id?: boolean;
    label?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isCurrent?: boolean;
    createdAt?: boolean;
};
export type AcademicYearOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "label" | "startDate" | "endDate" | "isCurrent" | "createdAt", ExtArgs["result"]["academicYear"]>;
export type AcademicYearInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    students?: boolean | Prisma.AcademicYear$studentsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.AcademicYear$enrollmentsArgs<ExtArgs>;
    classChangeRequest?: boolean | Prisma.AcademicYear$classChangeRequestArgs<ExtArgs>;
    _count?: boolean | Prisma.AcademicYearCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AcademicYearIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AcademicYearIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AcademicYearPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AcademicYear";
    objects: {
        students: Prisma.$StudentProfilePayload<ExtArgs>[];
        enrollments: Prisma.$ClassEnrollmentPayload<ExtArgs>[];
        classChangeRequest: Prisma.$ClassChangeRequestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        label: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["academicYear"]>;
    composites: {};
};
export type AcademicYearGetPayload<S extends boolean | null | undefined | AcademicYearDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload, S>;
export type AcademicYearCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AcademicYearFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AcademicYearCountAggregateInputType | true;
};
export interface AcademicYearDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AcademicYear'];
        meta: {
            name: 'AcademicYear';
        };
    };
    findUnique<T extends AcademicYearFindUniqueArgs>(args: Prisma.SelectSubset<T, AcademicYearFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AcademicYearFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AcademicYearFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AcademicYearFindFirstArgs>(args?: Prisma.SelectSubset<T, AcademicYearFindFirstArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AcademicYearFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AcademicYearFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AcademicYearFindManyArgs>(args?: Prisma.SelectSubset<T, AcademicYearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AcademicYearCreateArgs>(args: Prisma.SelectSubset<T, AcademicYearCreateArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AcademicYearCreateManyArgs>(args?: Prisma.SelectSubset<T, AcademicYearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AcademicYearCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AcademicYearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AcademicYearDeleteArgs>(args: Prisma.SelectSubset<T, AcademicYearDeleteArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AcademicYearUpdateArgs>(args: Prisma.SelectSubset<T, AcademicYearUpdateArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AcademicYearDeleteManyArgs>(args?: Prisma.SelectSubset<T, AcademicYearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AcademicYearUpdateManyArgs>(args: Prisma.SelectSubset<T, AcademicYearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AcademicYearUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AcademicYearUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AcademicYearUpsertArgs>(args: Prisma.SelectSubset<T, AcademicYearUpsertArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AcademicYearCountArgs>(args?: Prisma.Subset<T, AcademicYearCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AcademicYearCountAggregateOutputType> : number>;
    aggregate<T extends AcademicYearAggregateArgs>(args: Prisma.Subset<T, AcademicYearAggregateArgs>): Prisma.PrismaPromise<GetAcademicYearAggregateType<T>>;
    groupBy<T extends AcademicYearGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AcademicYearGroupByArgs['orderBy'];
    } : {
        orderBy?: AcademicYearGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AcademicYearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicYearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AcademicYearFieldRefs;
}
export interface Prisma__AcademicYearClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    students<T extends Prisma.AcademicYear$studentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYear$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrollments<T extends Prisma.AcademicYear$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYear$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    classChangeRequest<T extends Prisma.AcademicYear$classChangeRequestArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYear$classChangeRequestArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AcademicYearFieldRefs {
    readonly id: Prisma.FieldRef<"AcademicYear", 'String'>;
    readonly label: Prisma.FieldRef<"AcademicYear", 'String'>;
    readonly startDate: Prisma.FieldRef<"AcademicYear", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"AcademicYear", 'DateTime'>;
    readonly isCurrent: Prisma.FieldRef<"AcademicYear", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"AcademicYear", 'DateTime'>;
}
export type AcademicYearFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where?: Prisma.AcademicYearWhereInput;
    orderBy?: Prisma.AcademicYearOrderByWithRelationInput | Prisma.AcademicYearOrderByWithRelationInput[];
    cursor?: Prisma.AcademicYearWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AcademicYearScalarFieldEnum | Prisma.AcademicYearScalarFieldEnum[];
};
export type AcademicYearFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where?: Prisma.AcademicYearWhereInput;
    orderBy?: Prisma.AcademicYearOrderByWithRelationInput | Prisma.AcademicYearOrderByWithRelationInput[];
    cursor?: Prisma.AcademicYearWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AcademicYearScalarFieldEnum | Prisma.AcademicYearScalarFieldEnum[];
};
export type AcademicYearFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where?: Prisma.AcademicYearWhereInput;
    orderBy?: Prisma.AcademicYearOrderByWithRelationInput | Prisma.AcademicYearOrderByWithRelationInput[];
    cursor?: Prisma.AcademicYearWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AcademicYearScalarFieldEnum | Prisma.AcademicYearScalarFieldEnum[];
};
export type AcademicYearCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AcademicYearCreateInput, Prisma.AcademicYearUncheckedCreateInput>;
};
export type AcademicYearCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AcademicYearCreateManyInput | Prisma.AcademicYearCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AcademicYearCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    data: Prisma.AcademicYearCreateManyInput | Prisma.AcademicYearCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AcademicYearUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AcademicYearUpdateInput, Prisma.AcademicYearUncheckedUpdateInput>;
    where: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AcademicYearUpdateManyMutationInput, Prisma.AcademicYearUncheckedUpdateManyInput>;
    where?: Prisma.AcademicYearWhereInput;
    limit?: number;
};
export type AcademicYearUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AcademicYearUpdateManyMutationInput, Prisma.AcademicYearUncheckedUpdateManyInput>;
    where?: Prisma.AcademicYearWhereInput;
    limit?: number;
};
export type AcademicYearUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where: Prisma.AcademicYearWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicYearCreateInput, Prisma.AcademicYearUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AcademicYearUpdateInput, Prisma.AcademicYearUncheckedUpdateInput>;
};
export type AcademicYearDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
    where: Prisma.AcademicYearWhereUniqueInput;
};
export type AcademicYearDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicYearWhereInput;
    limit?: number;
};
export type AcademicYear$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProfileScalarFieldEnum | Prisma.StudentProfileScalarFieldEnum[];
};
export type AcademicYear$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassEnrollmentScalarFieldEnum | Prisma.ClassEnrollmentScalarFieldEnum[];
};
export type AcademicYear$classChangeRequestArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithRelationInput | Prisma.ClassChangeRequestOrderByWithRelationInput[];
    cursor?: Prisma.ClassChangeRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassChangeRequestScalarFieldEnum | Prisma.ClassChangeRequestScalarFieldEnum[];
};
export type AcademicYearDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicYearSelect<ExtArgs> | null;
    omit?: Prisma.AcademicYearOmit<ExtArgs> | null;
    include?: Prisma.AcademicYearInclude<ExtArgs> | null;
};
