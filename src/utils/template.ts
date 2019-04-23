import * as _ from 'underscore'

type TemplateReturn = (...data: any[]) => string

export const template = (templateString: string): TemplateReturn => _.template(templateString, { interpolate: /\{\{(.+?)\}\}/g })
