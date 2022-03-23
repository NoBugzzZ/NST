import React from "react";
import './index.css'

const forms = ['NST－04－JS002－2011－软件项目委托测试申请表-空白表'];

export default function Navigator() {
    return (
        <ul
            className="navigator"
        >
            <li>
                首页
            </li>
            <li className="has-sub-nav">
                表单
                <ul className="sub-navigator">
                    {forms.map(value => {
                        return (
                            <li key={value}>{value}</li>
                        )
                    })}
                </ul>

            </li>
        </ul>
    )
}