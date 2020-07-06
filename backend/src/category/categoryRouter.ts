import {Router} from "express"
import {handleAsync} from "../lib/handleAsync"
import {CategoryCache} from "./CategoryCache"
import {CategoryRepository} from "./CategoryRepository"

export const categoryRouter = Router({mergeParams: true})

categoryRouter.get('/typeField', handleAsync(async (req,res)=>{
    const categories = await CategoryCache.getHierarchy()
    res.send(categories)
}))

categoryRouter.get('/typePlain', handleAsync(async (req,res)=>{
    const categories = await CategoryRepository.findAllWithTypeField('CATEGORY')
    res.send(categories)
}))

categoryRouter.get('/typeTargetAudience', handleAsync(async (req,res)=>{
    const categories = await CategoryRepository.findAllWithTypeField('TARGET_AUDIENCE')
    res.send(categories)
}))